<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="<?php echo $language->language; ?>"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8" lang="<?php echo $language->language; ?>"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9" lang="<?php echo $language->language; ?>"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="<?php echo $language->language; ?>"> <!--<![endif]-->
<head>
  <?php echo $head; ?>
  <title><?php echo $head_title; ?></title>
  <?php echo $styles;  ?>
  <?php echo $scripts; ?>
  <!--[if IE 8]><meta http-equiv="X-UA-Compatible" content="IE=8" /><![endif]-->
  <!--[if lt IE 9]> <link href="<?php echo base_path() . path_to_theme() ?>/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" /> <![endif]--> 

</head>
<body class="<?php echo $classes; ?>" <?php echo $attributes;?> >
  <?php echo $page_top; ?>
  <?php echo $page; ?>
  <?php echo $page_bottom; ?>
</body>
</html>
