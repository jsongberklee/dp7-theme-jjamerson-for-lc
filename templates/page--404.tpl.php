<?php // so fresh & so clean
if ($title == 'Access denied') { header( 'Location: user?destination=' . substr ($_SERVER['REQUEST_URI'], 1 ) ); }
include('keyboard_quicklinks.inc.php');
echo render($page['page_top']);  
echo render($page['emergency_bar']);
echo render($page['top_nav']); 
echo render($page['header']); 
echo render($page['help']);
echo ($tabs ? '<div class="container tabs-container">'.render($tabs).'</div>' : '');

echo '<section id="off-screen" class="hidden">';
echo   '<nav id="off-screen-sidebar" class="closed">';
echo     render($page['off_screen_sidebar']);
echo   '</nav>';
echo   render($page['off_screen_overlay']);
echo '</section>';

echo '<section id="page" class="open">';
echo    $messages;
echo    '<div class="row">';
echo      render($page['sidebar_first']);
echo      '<article id="page-content" role="main" class="article">';
echo        ($title ? "<h1 id='page-title'>{$pretitle}{$title}</h1>{$subtitle}" : '');
echo        render($page['content_top']);    
echo        render($page['content']);        
echo        render($page['content_bottom']);   
echo      '</article>';
echo      render($page['sidebar_second']); 
echo    '</div>';
echo   render($page['stripes']);
echo   render($page['footer']);
echo '</section>';


echo render($page['page_bottom']);    