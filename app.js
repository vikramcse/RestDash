$(document).ready(function() {
	$('.payload-input').hide();

	$('input[type="radio"]').click(function() {
		if ($(this).is(':checked')) {
	    	if ($(this).val() === 'POST') {
	    		$('.payload-input').show();
	    	} else {
	    		$('.payload-input').hide();
	    	}
	    }
	});

	$('form').submit(function(event) {
		var formInfo = {
			'url' : $('#urlInput').val(),
			'method' : $("input[name=methodOption]:checked").val(),
			'headers' : {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		};

		if ($("#payload").val()) {
			formInfo['data'] = JSON.parse($('#payload').val());
		}

		if ($("#header").val()) {
			formInfo['headers'] = $('#header').val();
		}

		console.log(formInfo);

        NProgress.start();
		$.ajax({
            type : formInfo.method,
            url : formInfo.url,
            headers: formInfo.headers,
            dataType : 'json',
            data: formInfo.data,
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
        	NProgress.done();
        });

        event.preventDefault();
	});
});