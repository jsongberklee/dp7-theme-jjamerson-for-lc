<?php if ($content): ?>
  <section class="<?php print $classes; ?>" <?php print $attributes ?> title="Click to collapse">
    <div class="container">
      <span class="close-button">X</span>
      <?php print $content; ?>
    </div>
    <span class="expand-button">&#xf078; Campus Alert</span>
  </section>
<?php endif; ?>
