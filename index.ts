export const BUTTON_SCRIPT_URL = '//pocitadlolibise.seznam.cz/pocitadlolibise.js';
export const BUTTON_ELEMENT_NAME = 'seznam-pocitadlolibise';

export enum ButtonElementAttributeName {
  ENTITY_ID = 'entity',
  LAYOUT = 'layout',
  SIZE = 'size',
  ANALYTICS_HIT_PAYLOAD = 'data-payload',
  ANALYTICS_HIT_BUTTON_POSITION = 'button-position',
}

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

export interface ButtonElementAttributes {
  [ButtonElementAttributeName.ENTITY_ID]: string
  [ButtonElementAttributeName.LAYOUT]?: ButtonLayout
  [ButtonElementAttributeName.SIZE]?: ButtonSize
  [ButtonElementAttributeName.ANALYTICS_HIT_PAYLOAD]?: string
  [ButtonElementAttributeName.ANALYTICS_HIT_BUTTON_POSITION]?: string
}

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

type JSON_serializable =
  null
  | boolean
  | number
  | string
  | JSON_serializable[]
  | {[property: string]: JSON_serializable}
