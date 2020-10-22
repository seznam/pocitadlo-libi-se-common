export const ENTITY_ID_ATTRIBUTE_NAME = 'entity'
export const LAYOUT_ATTRIBUTE_NAME = 'layout'
export const SIZE_ATTRIBUTE_NAME = 'size'
export const ANALYTICS_HIT_PAYLOAD_ATTRIBUTE_NAME = 'data-payload'
export const ANALYTICS_HIT_BUTTON_POSITION_ATTRIBUTE_NAME = 'button-position'

export enum ButtonLayout {
  SEAMLESS = 'seamless',
  BUTTON_COUNT = 'button_count',
  BOX_COUNT = 'box_count',
}

export enum ButtonSize {
  MINIMALISTIC = 'minimalistic',
  SMALL = 'small',
  LARGE = 'large',
}

export enum ButtonColorVariable {
  PRIMARY_COLOR = 'primary-color',
  BACKGROUND_COLOR = 'background-color',
  HOVER_COLOR = 'hover-color',
  COUNT_COLOR = 'count-color',
  ACTIVE_COLOR = 'active-color',
}

export const COLOR_VARIABLE_NAMES: readonly ButtonColorVariable[] = [
  ButtonColorVariable.PRIMARY_COLOR,
  ButtonColorVariable.BACKGROUND_COLOR,
  ButtonColorVariable.HOVER_COLOR,
  ButtonColorVariable.COUNT_COLOR,
  ButtonColorVariable.ACTIVE_COLOR,
]

export interface ButtonElementAttributes {
  [ENTITY_ID_ATTRIBUTE_NAME]: string
  [LAYOUT_ATTRIBUTE_NAME]?: ButtonLayout
  [SIZE_ATTRIBUTE_NAME]?: ButtonSize
  [ANALYTICS_HIT_PAYLOAD_ATTRIBUTE_NAME]?: string
  [ANALYTICS_HIT_PAYLOAD_ATTRIBUTE_NAME]?: string
}

type JSON_serializable =
  null
  | boolean
  | number
  | string
  | JSON_serializable[]
  | {[property: string]: JSON_serializable}

export interface ButtonComponentProperties {
  entity: string
  layout?: ButtonLayout
  size?: ButtonSize
  colors?: {
    readonly [color in ButtonColorVariable]: string
  }
  analytics?: {
    payload?: JSON_serializable
    position?: string
  }
}
