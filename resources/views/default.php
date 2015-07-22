<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
          content="witzgo, adventure sharing, share or plan your adventures with others, backpackers, have fun">
    <meta name="author" content="Alex Culango">
    <link rel="icon" href="/favicon.png" type="image/png">

    <title>witzgo</title>
    <link href="//fonts.googleapis.com/css?family=Lato:300" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Comfortaa:300" rel="stylesheet" type="text/css">

    <!-- Bootstrap core CSS -->
    <link href="/css/app.css" rel="stylesheet">

</head>
<body>
<input type="hidden" v-model="view" value="<?php echo $view ?>"/>
<?php if (isset($sub)): ?>
    <input type="hidden" v-model="sub" value="<?php echo $sub ?>"/>
<?php endif; ?>
<page-header></page-header>
<div class="container">
    <component is="{{ view }}" sub="{{ sub }}"></component>
</div>
<page-footer date="<?php echo date('Y'); ?>"></page-footer>
<script src="/js/vendor.js"></script>
<script src="/js/default.js"></script>
</body>
</html>
