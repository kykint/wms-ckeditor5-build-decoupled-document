/**
 * @license Copyright (c) 2014-2025, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import {DecoupledEditor as DecoupledEditorBase} from '@ckeditor/ckeditor5-editor-decoupled';
import {Alignment} from '@ckeditor/ckeditor5-alignment';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {FontFamily, FontSize, FontBackgroundColor, FontColor} from '@ckeditor/ckeditor5-font';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Highlight} from '@ckeditor/ckeditor5-highlight';
import {AutoLink, Link} from '@ckeditor/ckeditor5-link';
import {Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize} from '@ckeditor/ckeditor5-image';
import {Indent, IndentBlock} from '@ckeditor/ckeditor5-indent';
import {Bold, Italic, Strikethrough, Underline, Subscript, Superscript} from '@ckeditor/ckeditor5-basic-styles';
import {List} from '@ckeditor/ckeditor5-list';
import {PasteFromOffice} from '@ckeditor/ckeditor5-paste-from-office';
import {Base64UploadAdapter} from '@ckeditor/ckeditor5-upload';
import {HorizontalLine} from '@ckeditor/ckeditor5-horizontal-line';
import {PageBreak} from '@ckeditor/ckeditor5-page-break';
import {RemoveFormat} from '@ckeditor/ckeditor5-remove-format';
import {SpecialCharacters, SpecialCharactersMathematical, SpecialCharactersArrows, SpecialCharactersText, SpecialCharactersCurrency} from '@ckeditor/ckeditor5-special-characters';
import {Table, TableToolbar, TableCellProperties, TableProperties, TableColumnResize} from '@ckeditor/ckeditor5-table';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {GeneralHtmlSupport} from '@ckeditor/ckeditor5-html-support';
import {HtmlEmbed} from '@ckeditor/ckeditor5-html-embed';
import {ButtonView} from '@ckeditor/ckeditor5-ui';
import {Plugin} from '@ckeditor/ckeditor5-core';
import saveIcon from './save.svg';
import orientationIcon from './orientation.svg';
// import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import HyphensFactory from 'hyphens/Resources/Private/Scripts/HyphensEditor/src/plugins/hyphens';

const CHANGE_ORIENTATION_TITLE = 'Change orientation';

function HyphensPlugin(editor) {
	editor.keystrokes.set('CTRL+SHIFT+Space', 'insertNbspEntity');
	editor.keystrokes.set('CTRL+Space', 'insertNbspEntity');
	editor.keystrokes.set('CTRL+SHIFT+ALT+Space', 'insertShyEntity');
	editor.keystrokes.set('CTRL+ALT+Space', 'insertShyEntity');
}

export default class DecoupledEditor extends DecoupledEditorBase {
}

class SavePlugin extends Plugin {
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add('save', locale => {
			const onSave = (editor.config.get('savePlugin') || {}).onSave || (() => {
			});
			const buttonView = new ButtonView(locale);
			buttonView.set({
				label: locale.t('Save'),
				icon: saveIcon,
				tooltip: true,
				tooltipPosition: 'se'
			});
			buttonView.on('execute', onSave);
			return buttonView;
		});
	}
}

class OrientationPlugin extends Plugin {
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add('changeOrientation', locale => {
			const onChange = (editor.config.get('orientationPlugin') || {}).onChange || (() => {
			});
			const buttonView = new ButtonView(locale);
			buttonView.set({
				label: locale.t(CHANGE_ORIENTATION_TITLE),
				icon: orientationIcon,
				tooltip: true,
				tooltipPosition: 's'
			});
			buttonView.on('execute', onChange);
			return buttonView;
		});
	}
}

class IndentBlockFixed extends IndentBlock {
	/**
	 * Setups conversion for using offset indents.
	 *
	 * @private
	 */
	_setupConversionUsingOffset() {
		const conversion = this.editor.conversion;
		const marginProperty = 'text-indent'; // единственное изменение

		conversion.for('upcast').attributeToAttribute({
			view: {
				styles: {
					[marginProperty]: /[\s\S]+/
				}
			},
			model: {
				key: 'blockIndent',
				value: viewElement => viewElement.getStyle(marginProperty)
			}
		});

		conversion.for('downcast').attributeToAttribute({
			model: 'blockIndent',
			view: modelAttributeValue => {
				return {
					key: 'style',
					value: {
						[marginProperty]: modelAttributeValue
					}
				};
			}
		});
	}
}

// Plugins to include in the build.
DecoupledEditor.builtinPlugins = [
	Alignment,
	Autoformat,
	AutoLink,
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
	IndentBlockFixed,
	Italic,
	Link,
	List,
	PasteFromOffice,
	Strikethrough,
	Table,
	TableToolbar,
	TableColumnResize,
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
	SavePlugin,
	OrientationPlugin,
	HtmlEmbed,
	HyphensFactory({}),
	HyphensPlugin,
	// SourceEditing,
	GeneralHtmlSupport
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
			'link',
			'subscript',
			'superscript',
			'htmlEmbed',
			'changeOrientation'
		]
	},
	language: 'ru',
	licenseKey: 'GPL',
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:wrapText',
			'imageStyle:breakText',
			'|',
			'toggleImageCaption'
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
	},
	htmlSupport: {
		allow: [
			// Enables all HTML features.
			{
				name: /.*/,
				attributes: true,
				classes: true,
				styles: true
			}
		]
	}
};

const t = window.CKEDITOR_TRANSLATIONS = window.CKEDITOR_TRANSLATIONS || {};
t.ru = t.ru || {dictionary: {}};
t.en = t.en || {dictionary: {}};
t.lt = t.lt || {dictionary: {}};
t.ru.dictionary[CHANGE_ORIENTATION_TITLE] = 'Изменить ориентацию';
t.en.dictionary[CHANGE_ORIENTATION_TITLE] = 'Change orientation';
t.lt.dictionary[CHANGE_ORIENTATION_TITLE] = 'Keisti orientaciją';
