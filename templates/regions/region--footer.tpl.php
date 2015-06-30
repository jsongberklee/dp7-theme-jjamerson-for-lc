<?php if ($content): ?>
  <section class="<?php print $classes; ?>" <?php print $attributes ?>>
    <div class="container">
      <nav class="footer-menus">
        <?php print $content; ?>
      </nav>
      <div class="footer-block">
          <span class="copy">Copyright &copy; <?php echo date('Y'); ?></span>
          <ul class="bar">
            <li><a href="/">Berklee College of Music</a></li>
            <li><a href="/contact-berklee">Contact Us</a></li>
            <li><a href="/policies/terms">Policies</a></li>
            <li><a href="/accreditation">Accreditation</a></li>
            <li><a href="https://berkleegigs.silkroad.com/">Careers at Berklee</a></li>
          </ul>
        </div>
    </div>
  </section>
<?php endif; ?>
