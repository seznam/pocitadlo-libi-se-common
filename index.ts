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

type LayoutDimensionsConfiguration = {
  readonly [size in ButtonSize]: {
    minWidth: number
    height: number
  }
}

export const BUTTON_DIMENSIONS: {readonly [layout in ButtonLayout]: LayoutDimensionsConfiguration} = {
  [ButtonLayout.SEAMLESS]: {
    [ButtonSize.MINIMALISTIC]: {
      minWidth: 40,
      height: 20,
    },
    [ButtonSize.SMALL]: {
      minWidth: 100,
      height: 20,
    },
    [ButtonSize.LARGE]: {
      minWidth: 100,
      height: 20,
    },
  },
  [ButtonLayout.BUTTON_COUNT]: {
    [ButtonSize.MINIMALISTIC]: {
      minWidth: 40,
      height: 20,
    },
    [ButtonSize.SMALL]: {
      minWidth: 100,
      height: 20,
    },
    [ButtonSize.LARGE]: {
      minWidth: 100,
      height: 28,
    },
  },
  [ButtonLayout.BOX_COUNT]: {
    [ButtonSize.MINIMALISTIC]: {
      minWidth: 40,
      height: 40,
    },
    [ButtonSize.SMALL]: {
      minWidth: 100,
      height: 40,
    },
    [ButtonSize.LARGE]: {
      minWidth: 100,
      height: 58,
    },
  },
}

export interface ButtonElementAttributes {
  [ButtonElementAttributeName.ENTITY_ID]: string
  [ButtonElementAttributeName.LAYOUT]?: ButtonLayout
  [ButtonElementAttributeName.SIZE]?: ButtonSize
  [ButtonElementAttributeName.ANALYTICS_HIT_PAYLOAD]?: string
  [ButtonElementAttributeName.ANALYTICS_HIT_BUTTON_POSITION]?: string
}

export interface ButtonComponentProperties {
  readonly entity: string
  readonly layout?: ButtonLayout
  readonly size?: ButtonSize
  readonly colors?: {
    readonly [color in ButtonColorVariable]: string
  }
  readonly analytics?: {
    readonly payload?: JSON_serializable
    readonly position?: string
  }
}

type JSON_serializable =
  null
  | boolean
  | number
  | string
  | readonly JSON_serializable[]
  | {readonly [property: string]: JSON_serializable}
