$(document).ready(function() {
	$('form').submit(function(event) {
		var formInfo = {
			'url' : $('#urlInput').val(),
			'method' : $("input[name=methodOption]:checked").val(),
		};

		if ($("#header").val()) {
			formInfo['header'] = JSON.parse($('#header').val());
		} else {
			formInfo['header'] = {};
		}

        NProgress.start();
		$.ajax({
            type : formInfo.method,
            url : formInfo.url,
            header: formInfo.header,
            dataType : 'json',
            encode : true
        }).done(function(data) {

        	var jsonText = JSON.stringify(data);
        	var obj = JSON.parse(jsonText);
    		var pretty = JSON.stringify(obj, undefined, 2);
        	$('#output').val(pretty);

			NProgress.done();
        	toastr.success(formInfo.method + " Request Successful")
        }).fail(function() {
        	toastr.error(formInfo.method + " Request Failed")
        });

        event.preventDefault();
	});
});