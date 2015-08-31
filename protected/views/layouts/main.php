<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="language" content="en" />

    <title><?php echo CHtml::encode($this->pageTitle); ?></title>
    <!--meta http-equiv="Cache-Control" content="no-cache"-->
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/bootstrap-wysihtml5.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/visualsearch.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/jquery-ui-1.8.18.custom.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/all.css" />
    <!-- HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>
  <body>

    <div class="navbar navbar-fixed-top noprint">
      <div class="navbar-inner">
        <div class="container">
          <div id="loader" class="loading"></div>
          <a id="logo" href="#"><b>Travel</b></a>
          <div id="nav-menu" class="pull-right login-required"></div>
          <div class="login guest-only"></div>
        </div>
      </div>
    </div>

    <div class="head noprint"></div>

    <div class="main container noprint">
      <?php echo $content?>
    </div> <!-- /.container -->
    <div id="for-print"></div>
  </body>
</html>
