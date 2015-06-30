<?php
$attributes = $variables['attributes'];

if ( isset($attributes['small-src']) || isset($attributes['medium-src']) ) {
  $attributes['large-src'] = file_create_url($variables['path']);
  $attributes['class'][] = 'shrinkage-performed';
  if ( !isset($attributes['small-src']) ) {
    $path = $attributes['medium-src'];
  } else {
    $path = $attributes['small-src'];
  }
} else {
  $path = $variables['path'];
}
$attributes['src'] = file_create_url($path);

foreach (array('width', 'height', 'alt', 'title', 'caption') as $key) {
  if (isset($variables[$key])) {
    $attributes[$key] = $variables[$key];
  }
}

echo '<img' . drupal_attributes($attributes) . ' />';