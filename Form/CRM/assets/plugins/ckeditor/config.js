/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';
    //config.extraPlugins = 'html5video';
    config.extraPlugins = 'html5video,widget';
    config.image_previewText = ' ';
    config.entities = false;
    //config.removeButtons = 'BrowseServer';
    //config.extraPlugins = 'video';
    /*config.toolbarGroups = [		
		
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list','align', 'paragraph'] },
		{ name: 'links', groups: ['links'] },
		{ name: 'insert', groups: ['insert'], items: ['image'] },
		'/',
		{ name: 'styles', groups: ['styles'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'tools', groups: ['tools'] }
		
    ];*/
    config.toolbarGroups = [		
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
		{ name: 'forms', groups: ['forms'] },
		'/',
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
		{ name: 'links', groups: ['links'] },
		{ name: 'insert', groups: ['insert'] },
		'/',
		{ name: 'styles', groups: ['styles'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'tools', groups: ['tools'] },
		{ name: 'others', groups: ['others'] },
		{ name: 'about', groups: ['about'] }
    ];
    //config.toolbar = [
	//{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
	//{ name: 'paragraph', groups: ['list', 'indent', 'align'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
	//{ name: 'links', items: ['Link', 'Unlink'] },
	//{ name: 'insert', items: ['Image', 'Smiley','table'] },
	//'/',
	//{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
	//{ name: 'colors', items: ['TextColor', 'BGColor'] },
	//{ name: 'tools', items: ['Maximize', 'ShowBlocks'] },
    //	{ name: 'insert', groups: ['insert'], items: ['image'] },
    //];

   /* config.toolbar = [
		{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-'] },
		{ name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
		{ name: 'insert', items: ['Image'] },
		{ name: 'styles', items: ['Font', 'FontSize'] },
		{ name: 'colors', items: ['TextColor', 'BGColor', 'Smiley'] },
        { name: 'links', items: ['link', 'unlink'] },
		{ name: 'tools', items: ['Maximize'] }

        //{ name: 'insert', items: ['Smiley']},
    ];*/
};
