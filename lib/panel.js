var panelRender = {


	clearResults : function(){
		$('#grid-of-results>div').remove();
	},

	addLineOfResult : function(codeOfSuite, typeResult, call, position, link, time){
		var div = $('<div>');
		var i = $('<i>');
		var h4 = $('<h4>');
		var small = $('<small>').text( ' (' + codeOfSuite + ')' );
		var timeBox = $('<small>').text( ' Duration: ' + timeBox );

		var classIcon = (typeResult === true) ? 'glyphicon-thumbs-up text-success' : 'glyphicon-fire text-danger';
		var icoOne = i.clone().addClass('glyphicon ' + classIcon ).attr('aria-hidden',true);
		var icoTwo = i.clone().addClass('glyphicon glyphicon-new-window');

		var message = (typeResult) ? ' Success' : ' Failed';
		var descrition = h4.clone().text( message ).append( small ).prepend(icoOne);
		var a = $('<a>').addClass('btn btn-link').attr('link',link).text(' click to details').prepend(icoTwo).on('click', call );
		var well = div.clone().addClass('well well-sm').append( descrition, time, a );
		var row = div.clone().addClass( 'col-xs-6' ).append( well );

		$('#grid-of-results').append( row );
	},

	load : function (object) {

		var call = function(evt){
			var link = $(evt.currentTarget).attr('link');
			addon.port.emit("load-suite", link);
		};

		this.clearResults();

		for (var index in object.results){
			var position = (index%2);
			var result = object.results[index];
			panelRender.addLineOfResult(result.id, result.passed, call, position, result.link, result.time);
		}

		if( object.results === 0 ){
			$('#isNotResult').removeClass('hide');
		}
	}
};
