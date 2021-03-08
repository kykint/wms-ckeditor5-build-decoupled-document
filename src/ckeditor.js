/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import List from '@ckeditor/ckeditor5-list/src/list';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from './save.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency';

export default class DecoupledEditor extends DecoupledEditorBase {}

class SavePlugin extends Plugin {
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add( 'save', locale => {
			const onSave = ( editor.config.get( 'savePlugin' ) || {} ).onSave || ( () => {} );
			const buttonView = new ButtonView( locale );
			buttonView.set( {
				label: 'Сохранить',
				icon: imageIcon,
				tooltip: true
			} );
			buttonView.on( 'execute', onSave );
			return buttonView;
		} );
	}
}

// Plugins to include in the build.
DecoupledEditor.builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	// Link,
	List,
	PasteFromOffice,
	Strikethrough,
	Table,
	TableToolbar,
	Underline,
	Base64UploadAdapter,
	FontBackgroundColor,
	FontColor,
	HorizontalLine,
	ImageResize,
	PageBreak,
	RemoveFormat,
	SpecialCharacters,
	SpecialCharactersText,
	SpecialCharactersArrows,
	SpecialCharactersMathematical,
	SpecialCharactersCurrency,
	Subscript,
	Superscript,
	TableCellProperties,
	TableProperties,
	Essentials,
	// Paragraph,
	SavePlugin
];

// Editor configuration.
DecoupledEditor.defaultConfig = {
	toolbar: {
		items: [
			'save',
			'undo',
			'redo',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontBackgroundColor',
			'fontColor',
			'removeFormat',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'|',
			'indent',
			'outdent',
			'|',
			'imageUpload',
			'insertTable',
			'|',
			'horizontalLine',
			'specialCharacters',
			'pageBreak',
			// 'link',
			'subscript',
			'superscript'
		]
	},
	language: 'ru',
	image: {
		styles: [
			'full',
			'alignLeft',
			'alignRight'
		],
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:full',
			'imageStyle:alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
	fontSize: {
		options: [
			8, 10, 12, 14, 'default', 18, 20, 24, 28
		]
	},
	fontFamily: {
		options: [
			'Arial, Helvetica, sans-serif',
			'Courier New, Courier, monospace',
			'Times New Roman, Times, serif',
			'Comic sans, Comic sans MS, cursive',
			'Verdana, Geneva, sans-serif'
		]
	}
};
