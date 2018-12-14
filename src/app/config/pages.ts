import { ConfigModel } from '../core/interfaces/config';

export class PagesConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			'/': {
				page: {
					title: 'Dashboard',
					desc: 'Latest updates and statistic charts'
				}
			},
			ngbootstrap: {
				accordion: {
					page: { title: 'Accordion', desc: '' }
				},
				alert: {
					page: { title: 'Alert', desc: '' }
				},
				buttons: {
					page: { title: 'Buttons', desc: '' }
				},
				carousel: {
					page: { title: 'Carousel', desc: '' }
				},
				collapse: {
					page: { title: 'Collapse', desc: '' }
				},
				datepicker: {
					page: { title: 'Datepicker', desc: '' }
				},
				dropdown: {
					page: { title: 'Dropdown', desc: '' }
				},
				modal: {
					page: { title: 'Modal', desc: '' }
				},
				pagination: {
					page: { title: 'Pagination', desc: '' }
				},
				popover: {
					page: { title: 'Popover', desc: '' }
				},
				progressbar: {
					page: { title: 'Progressbar', desc: '' }
				},
				rating: {
					page: { title: 'Rating', desc: '' }
				},
				tabs: {
					page: { title: 'Tabs', desc: '' }
				},
				timepicker: {
					page: { title: 'Timepicker', desc: '' }
				},
				tooltip: {
					page: { title: 'Tooltip', desc: '' }
				},
				typehead: {
					page: { title: 'Typehead', desc: '' }
				}
			},
			material: {
				// form controls
				'form-controls': {
					autocomplete: {
						page: { title: 'Auto Complete', desc: '' }
					},
					checkbox: {
						page: { title: 'Checkbox', desc: '' }
					},
					datepicker: {
						page: { title: 'Datepicker', desc: '' }
					},
					radiobutton: {
						page: { title: 'Radio Button', desc: '' }
					},
					formfield: {
						page: { title: 'Form field', desc: '' }
					},
					input: {
						page: { title: 'Input', desc: '' }
					},
					select: {
						page: { title: 'Select', desc: '' }
					},
					slider: {
						page: { title: 'Slider', desc: '' }
					},
					slidertoggle: {
						page: { title: 'Slider Toggle', desc: '' }
					}
				},
				// navigation
				navigation: {
					menu: {
						page: { title: 'Menu', desc: '' }
					},
					sidenav: {
						page: { title: 'Sidenav', desc: '' }
					},
					toolbar: {
						page: { title: 'Toolbar', desc: '' }
					}
				},
				// layout
				layout: {
					card: {
						page: { title: 'Card', desc: '' }
					},
					divider: {
						page: { title: 'Divider', desc: '' }
					},
					'expansion-panel': {
						page: { title: 'Expansion panel', desc: '' }
					},
					'grid-list': {
						page: { title: 'Grid list', desc: '' }
					},
					list: {
						page: { title: 'List', desc: '' }
					},
					tabs: {
						page: { title: 'Tabs', desc: '' }
					},
					stepper: {
						page: { title: 'Stepper', desc: '' }
					},
					'default-forms': {
						page: { title: 'Default Forms', desc: '' }
					},
					tree: {
						page: { title: 'Tree', desc: '' }
					},
				},
				// buttons & indicators
				'buttons-and-indicators': {
					button: {
						page: { title: 'Button', desc: '' }
					},
					'button-toggle': {
						page: { title: 'Button toggle', desc: '' }
					},
					chips: {
						page: { title: 'Chips', desc: '' }
					},
					icon: {
						page: { title: 'Icon', desc: '' }
					},
					'progress-bar': {
						page: { title: 'Progress bar', desc: '' }
					},
					'progress-spinner': {
						page: { title: 'Progress spinner', desc: '' }
					}
				},
				// popups & models
				'popups-and-modals': {
					'bottom-sheet': {
						page: { title: 'Bottom sheet', desc: '' }
					},
					dialog: {
						page: { title: 'Dialog', desc: '' }
					},
					snackbar: {
						page: { title: 'Snackbar', desc: '' }
					},
					tooltip: {
						page: { title: 'Tooltip', desc: '' }
					}
				},
				// Data tables
				'data-table': {
					paginator: {
						page: { title: 'Paginator', desc: '' }
					},
					'sort-header': {
						page: { title: 'Sort header', desc: '' }
					},
					table: {
						page: { title: 'Table', desc: '' }
					}
				}
			},
			metronic: {
				accordion: {
					page: { title: 'Accordion', desc: '' }
				},
				'sticky-form-actions': {
					page: { title: 'Sticky Form Actions', desc: '' }
				},
				forms: {
					page: { title: 'Forms', desc: '' }
				}
			},
			forms: {
				page: { title: 'Forms', desc: '' }
			},
			mail: {
				page: { title: 'Mail', desc: 'Mail' }
			},
			ecommerce: {
				customers: {
					page: { title: 'Customers', desc: '' }
				},
				products: {
					edit: {
						page: { title: 'Edit product', desc: '' }
					},
					add: {
						page: { title: 'Create product', desc: '' }
					}
				},
				orders: {
					page: { title: 'Orders', desc: '' }
				}
			},
			'user-management': {
                '': {
                    page: { title: 'User Management', desc: '' }
                },
				':id': {
					page: { title: 'User Information', desc: '' }
				},
			},
			'audit-log': {
				page: { title: 'Audit Log', desc: '' }
			},
			builder: {
				page: { title: 'Layout Builder', desc: 'Layout builder' }
			},
			header: {
				actions: {
					page: { title: 'Actions', desc: 'actions example page' }
				}
			},
			profile: {
				page: { title: 'User Profile', desc: '' }
			},
			404: {
				page: { title: '404 Not Found', desc: '', subheader: false }
			}
		};
	}
}
