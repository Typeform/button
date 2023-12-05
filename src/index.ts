import { open, SelectActionPayload, EditActionPayload } from './lib/open'
import { getDefaultConfig, setDefaultConfig } from './lib/default-config'

export const setDefaultConfiguration = setDefaultConfig

export const selectForm = (payload: SelectActionPayload) => {
  return open({ ...getDefaultConfig(), ...payload, action: 'select' })
}

export const editForm = (payload: EditActionPayload) => {
  return open({ ...getDefaultConfig(), ...payload, action: 'edit' })
}
