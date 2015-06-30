<?php
if ( isset($node->language) ) {
  $lang = $node->language; 
} else {
  $lang = 'und';
}

if ( isset($node->field_isotope_tags[$lang]) && count($node->field_isotope_tags[$lang]) ) {

  $tids = array();
  foreach( $node->field_isotope_tags[$lang] as $tid) {
    $tids[] = $tid['tid'];
  }

  try {
    $tags = taxonomy_term_load_multiple( $tids );

    foreach ($tags as $tag) {
      $tag_name = strtolower($tag->name);
      $tag_name = preg_replace('/[^a-z0-9 -]+/', '', $tag_name);
      $tag_name = preg_replace('/\s/', '-', $tag_name);
      $tag_name = 'tagged-' . $tag_name;
      $classes .= " {$tag_name}";
    }  
  } catch (Exception $e) {
    
  }  
  
}

?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php print $user_picture; ?>
  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
    <div class="submitted">
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>
  <div class="content"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>
  <?php print render($content['links']); ?>
  <?php print render($content['comments']); ?>
</div>