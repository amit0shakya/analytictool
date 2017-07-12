var g_ptsEdit = false
,	g_ptsBlockFabric = null
,	g_ptsHoverAnim = 300	// Table hover animation lenght, ms - hardcoded for now
,	g_ptsHoverMargin = 20;	// Table hover margin displace, px - hardcoded for now
jQuery(document).ready(function(){
	_ptsInitFabric();
	if(typeof(ptsTables) !== 'undefined' && ptsTables && ptsTables.length) {
		for(var i = 0; i < ptsTables.length; i++) {
			g_ptsBlockFabric.addFromHtml(ptsTables[ i ], jQuery('#'+ ptsTables[ i ].view_id));
		}
	}
});
function _ptsInitFabric() {
	g_ptsBlockFabric = new ptsBlockFabric();
}
function ptsGetFabric() {
	return g_ptsBlockFabric;
}
function _ptsIsEditMode() {
	return (typeof(g_ptsEditMode) !== 'undefined' && g_ptsEditMode);
}