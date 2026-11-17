import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  OLLAMA_RU_MIN_GPU_SYSTEM_RAM_MIB,
  OLLAMA_RU_MIN_VRAM_MIB,
  OLLAMA_RU_TIERS,
  pickTierByVram,
  recommendedModelsForTier,
} from '../../constants/ollama_ru.js'

const ALL_TIERS = ['cpu', 'gpu_6gb', 'gpu_8gb', 'gpu_16gb'] as const

test('no detectable VRAM always falls back to the CPU tier', () => {
  for (const vram of [undefined, null, 0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(pickTierByVram(vram, 16 * 1024), 'cpu')
  }
})

test('VRAM below 4 GiB stays on the CPU tier', () => {
  assert.equal(pickTierByVram(OLLAMA_RU_MIN_VRAM_MIB.gpu_6gb - 1, 16 * 1024), 'cpu')
})

test('4–6 GiB of VRAM selects gpu_6gb, including both boundaries', () => {
  assert.equal(pickTierByVram(OLLAMA_RU_MIN_VRAM_MIB.gpu_6gb, 16 * 1024), 'gpu_6gb')
  assert.equal(pickTierByVram(5 * 1024, 16 * 1024), 'gpu_6gb')
  assert.equal(pickTierByVram(6 * 1024, 16 * 1024), 'gpu_6gb')
})

test('VRAM just above 6 GiB selects gpu_8gb', () => {
  assert.equal(pickTierByVram(OLLAMA_RU_MIN_VRAM_MIB.gpu_8gb, 16 * 1024), 'gpu_8gb')
  assert.equal(pickTierByVram(8 * 1024, 16 * 1024), 'gpu_8gb')
  assert.equal(pickTierByVram(OLLAMA_RU_MIN_VRAM_MIB.gpu_16gb - 1, 16 * 1024), 'gpu_8gb')
})

test('12 GiB of VRAM selects gpu_16gb', () => {
  assert.equal(pickTierByVram(OLLAMA_RU_MIN_VRAM_MIB.gpu_16gb, 32 * 1024), 'gpu_16gb')
  assert.equal(pickTierByVram(16 * 1024, 32 * 1024), 'gpu_16gb')
  assert.equal(pickTierByVram(24 * 1024, 64 * 1024), 'gpu_16gb')
})

test('a GPU tier needs enough system RAM for the rest of NOMAD', () => {
  assert.equal(pickTierByVram(8 * 1024, OLLAMA_RU_MIN_GPU_SYSTEM_RAM_MIB - 1), 'cpu')
  assert.equal(pickTierByVram(8 * 1024, OLLAMA_RU_MIN_GPU_SYSTEM_RAM_MIB), 'gpu_8gb')
  // Unknown RAM is not evidence of a small machine, so VRAM still decides.
  assert.equal(pickTierByVram(8 * 1024, undefined), 'gpu_8gb')
})

test('every tier has 2–3 models', () => {
  for (const tier of ALL_TIERS) {
    const count = OLLAMA_RU_TIERS[tier].models.length
    assert.ok(count >= 2 && count <= 3, `${tier} has ${count} models`)
  }
})

test('all model tags in the registry are unique', () => {
  const tags = ALL_TIERS.flatMap((tier) => OLLAMA_RU_TIERS[tier].models.map((model) => model.tag))
  assert.equal(new Set(tags).size, tags.length, `duplicate tag: ${tags.join(', ')}`)
})

test('registry entries carry the tag, size and source the picker needs', () => {
  for (const tier of ALL_TIERS) {
    for (const model of OLLAMA_RU_TIERS[tier].models) {
      assert.match(model.tag, /^[a-z0-9.-]+:.+$/)
      assert.match(model.size, /^\d+(\.\d+)?(MB|GB)$/)
      assert.ok(model.description.length > 20)
      assert.match(model.sourceUrl, /^https:\/\/ollama\.com\/library\//)
    }
  }
})

test('every file fits the size budget of its tier', () => {
  const toMib = (size: string) => {
    const [, value, unit] = size.match(/^(\d+(?:\.\d+)?)(MB|GB)$/)!
    return Number(value) * (unit === 'GB' ? 1024 : 1)
  }
  const budget = { cpu: 2.5 * 1024, gpu_6gb: 4 * 1024, gpu_8gb: 6 * 1024, gpu_16gb: 10 * 1024 }

  for (const tier of ALL_TIERS) {
    for (const model of OLLAMA_RU_TIERS[tier].models) {
      assert.ok(toMib(model.size) <= budget[tier], `${tier} ${model.tag} is ${model.size}`)
    }
  }
})

test('the picker gets the full tag as the model name, so the pull is exact', () => {
  const models = recommendedModelsForTier('cpu')
  assert.equal(models.length, OLLAMA_RU_TIERS.cpu.models.length)
  for (const [index, model] of models.entries()) {
    const registry = OLLAMA_RU_TIERS.cpu.models[index]
    assert.equal(model.name, registry.tag)
    assert.equal(model.tags.length, 1)
    assert.equal(model.tags[0].name, registry.tag)
    assert.equal(model.tags[0].size, registry.size)
    assert.equal(model.tags[0].cloud, false)
  }
  assert.equal(new Set(models.map((model) => model.id)).size, models.length)
})

test('tier labels are Russian and name the hardware', () => {
  assert.match(OLLAMA_RU_TIERS.cpu.label, /без видеокарты/)
  assert.match(OLLAMA_RU_TIERS.gpu_6gb.label, /4–6 ГБ/)
  assert.match(OLLAMA_RU_TIERS.gpu_8gb.label, /8 ГБ/)
  assert.match(OLLAMA_RU_TIERS.gpu_16gb.label, /12–16\+ ГБ/)
})
