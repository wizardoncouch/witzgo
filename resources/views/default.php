<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="witzgo, adventure sharing, backpackers">
    <meta name="author" content="Alex Culango">
    <link rel="icon" href="favicon.ico">

    <title>witzgo</title>
    <link href="//fonts.googleapis.com/css?family=Lato:300" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Comfortaa:300" rel="stylesheet" type="text/css">

    <!-- Bootstrap core CSS -->
    <link href="css/app.css" rel="stylesheet">

</head>
<body>
<background v-if="showbackground"></background>
<page-header view="{{ view }}" sub-view="{{ subView }}"></page-header>
<div class="container">
    <component is="{{ view }}"></component>
</div>
<script src="js/vendor.js"></script>
<script src="js/default.js"></script>
</body>
</html>
