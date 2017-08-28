$('input').keypress( function(e) {
    if(e.which && e.which === 13 || e.KeyCode ===13) {
        if($("#word-input").val() === '' || $("#mean-input").val() === ''){
            return false;
        }
    }
})

$('.complete').click(function(){
	$(this).closest("li").css('display', 'none');
});