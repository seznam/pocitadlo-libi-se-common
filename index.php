<?php

namespace Cz\Seznam\PocitadloLibiSe;

use Error;

const BUTTON_SCRIPT_URL = '//pocitadlolibise.seznam.cz/pocitadlolibise.js';

final class ButtonElementAttributeName {
  const ENTITY_ID = 'entity';
  const LAYOUT = 'layout';
  const SIZE = 'size';
  const ANALYTICS_HIT_PAYLOAD = 'data-payload';
  const ANALYTICS_HIT_BUTTON_POSITION = 'button-position';

  private function __construct() {}
}

final class ButtonLayout {
  const SEAMLESS = 'seamless';
  const BUTTON_COUNT = 'button_count';
  const BOX_COUNT = 'box_count';

  private function __construct() {}
}

final class ButtonSize {
  const MINIMALISTIC = 'minimalistic';
  const SMALL = 'small';
  const LARGE = 'large';

  private function __construct() {}
}

final class ButtonColorVariable {
  const PRIMARY_COLOR = '--primary-color';
  const BACKGROUND_COLOR = '--background-color';
  const HOVER_COLOR = '--hover-color';
  const COUNT_COLOR = '--count-color';
  const ACTIVE_COLOR = '--active-color';

  private function __construct() {}
}

const BUTTON_ELEMENT_NAME = 'seznam-pocitadlolibise';

function renderButton(array $attributes, $placeholder = ''): string {
  $preparedAttributes = validateAttributes($attributes);
  $colors = $preparedAttributes['colors'];
  unset($preparedAttributes['colors']);
  if (is_array($colors)) {
    $colorStyles = array_map(function($colorName) use ($colors) {
      return "$colorName:" . $colors[$colorName];
    }, array_keys($colors));
    $preparedAttributes['style'] = implode(';', $colorStyles);
  }
  $renderedAttributes = array_map(function($attributeName) use ($preparedAttributes) {
    $escapedAttributeValue = htmlspecialchars($preparedAttributes[$attributeName], ENT_COMPAT | ENT_HTML5);
    return "$attributeName=\"$escapedAttributeValue\"";
  }, array_keys($preparedAttributes));
  $attributeList = (empty($renderedAttributes) ? '' : ' ') . implode(' ', $renderedAttributes);
  $buttonElementName = BUTTON_ELEMENT_NAME;
  return "<$buttonElementName$attributeList>${placeholder}</$buttonElementName>";
}

function renderButtonScript(): string {
  return '<script src="' . htmlspecialchars(BUTTON_SCRIPT_URL, ENT_COMPAT | ENT_HTML5) . '" async></script>';
}

function validateAttributes(array $attributes): array {
  if (!isset($attributes[ButtonElementAttributeName::ENTITY_ID])) {
    throw new Error(
      "The provided attributes are missing the required " . ButtonElementAttributeName::ENTITY_ID . " attribute"
    );
  }
  $validatedAttributes = [
    ButtonElementAttributeName::ENTITY_ID => $attributes[ButtonElementAttributeName::ENTITY_ID]
  ];

  if (isset($attributes[ButtonElementAttributeName::LAYOUT])) {
    if (!in_array(
      $attributes[ButtonElementAttributeName::LAYOUT],
      [ButtonLayout::SEAMLESS, ButtonLayout::BUTTON_COUNT, ButtonLayout::BOX_COUNT],
      true
    )) {
      throw new Error(
        "Found an invalid value for the " . ButtonElementAttributeName::LAYOUT . " attribute: " .
        $attributes[ButtonElementAttributeName::LAYOUT]
      );
    }
    $validatedAttributes[ButtonElementAttributeName::LAYOUT] = $attributes[ButtonElementAttributeName::LAYOUT];
  }

  if (isset($attributes[ButtonElementAttributeName::SIZE])) {
    if (!in_array(
      $attributes[ButtonElementAttributeName::SIZE],
      [ButtonSize::MINIMALISTIC, ButtonSize::SMALL, ButtonSize::LARGE],
      true
    )) {
      throw new Error(
        "Found an invalid value for the " . ButtonElementAttributeName::SIZE . " attribute: " .
        $attributes[ButtonElementAttributeName::SIZE]
      );
    }

    $validatedAttributes[ButtonElementAttributeName::SIZE] = $attributes[ButtonElementAttributeName::SIZE];
  }

  if (isset($attributes[ButtonElementAttributeName::ANALYTICS_HIT_PAYLOAD])) {
    $validatedAttributes[ButtonElementAttributeName::ANALYTICS_HIT_PAYLOAD] =
      $attributes[ButtonElementAttributeName::ANALYTICS_HIT_PAYLOAD];
  }

  if (isset($attributes[ButtonElementAttributeName::ANALYTICS_HIT_BUTTON_POSITION])) {
    $validatedAttributes[ButtonElementAttributeName::ANALYTICS_HIT_BUTTON_POSITION] =
      $attributes[ButtonElementAttributeName::ANALYTICS_HIT_BUTTON_POSITION];
  }

  if (isset($attributes['colors'])) {
    $colors = $attributes['colors'];
    $colorNames = [
      ButtonColorVariable::PRIMARY_COLOR,
      ButtonColorVariable::BACKGROUND_COLOR,
      ButtonColorVariable::HOVER_COLOR,
      ButtonColorVariable::COUNT_COLOR,
      ButtonColorVariable::ACTIVE_COLOR
    ];
    if (
      !is_array($colors)
      || !empty(array_filter(
        $colors,
        function($key) use ($colorNames) { return !in_array($key, $colorNames, true); },
        ARRAY_FILTER_USE_KEY
      ))
      || !empty(array_filter($colors, function($color) { return !is_string($color); }))
    ) {
      throw new Error("Found an invalid value for the colors configuration: " . json_encode($attributes['colors']));
    }
    $validatedAttributes['colors'] = $attributes['colors'];
  }

  return $validatedAttributes;
}
