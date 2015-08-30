<script src="/app/js/config.js"></script>
<script data-main="app/js/main" src="/app/js/libs/require/require.js"></script>
<script type="text/javascript">
    //HELPERS: (TODO: rebase to separate file)
    function l(t,y) {console.log(t,y);}
    
    define('onLoad', ['app'], function(App) {
    <?php if (Yii::app()->user->isGuest): ?>
        App.vent.trigger('webUser:guest');
    <?php else: ?>
        App.addInitializer(function() {
            App.vent.trigger('webUser:init', <?php echo JSON::encode(Yii::app()->user); ?>);
        });
    <?php endif; ?>
    });
</script>
