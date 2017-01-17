(function($){

	var BuyerModel = Backbone.Model.extend({
		defaults: {
			name: '',
			age: ''
		},

		//Define validation criteria
		validation: {
			name: {
				required: true
			},
			age: {
				min: 18
			}
		}
	});

	var PreviewInvoiceItemView = Backbone.View.extend({

			//Define template using templating engine from Underscore.js.
			template : _.template('\
				Price: <%= price%>.\
				Quantity: <%= quantity%>.\
				Amount: <%= amount%>.\
				'),

			//Render view.
			render: function(){

				//Generate HTML by rendering the template.
				var html = this.template({

					// Pass model properties to the template.
					price: this.model.get("price"),
					quantity : this.model.get("quantity"),

					//Calculte amount and pass it the template
					amount: this.model.calculateAmount()
				});

				//Set html for the view element using jQuery.
				$(this.el).html(html);
			},

		});

	var InvoiceListView = Backbone.View.extend({
		//Define template using templating engine from Underscore.js
		template: _.template('Displaying list of invoices'),

		//Render view
		render: function(){
			//Generate HTML by rendering the template
			var html = this.template();
			$(this.el).html(html);
		},
	});

	var InvoicePageView = Backbone.View.extend({
		// Define template using templating engining from Underscore.js
		template: _.template('Displaying invoice #\
			<%=id%>'),
		//Render view
		render: function(){
			var html= this.template({
				id: this.id
			});
			$(this.el).html(html);

		},
	});

	var BuyerModelFormView = Backbone.View.extend({
		//Bind Backbone.validation to a view.
		initialize: function(){
			Backbone.Validation.bind(this);
		},

		template: _.template('\
			<form>\
				Enter name:\
				<input name="name" type="text" value="<%=name%>"><br>\
				Enter age:\
				<input name="age" type="text" value="<%=age%>"><br>\
				<input type="button" name="save" value="save">\
			</form>\
			'),

		render: function(){
			var html  = this.template(this.model.toJSON());

			$(this.el).html(html);
		},

		//Bind save callback click event
		events: {
			'click [name~="save"]': 'save'
		},

		save: function(){
			//Update model attributes.
			this.model.set({
				name: $('[name~="name"]').val(),
				age: $('[name~="age"]').val()
			});
		}
	});

	var InvoiceItemModel = Backbone.Model.extend({

			//Set default values.
			defaults : {
				price : 0,
				quantity : 0
			},

			//Calculate amount
			calculateAmount : function(){
				return this.get('price') * this.get('quantity');
			}
		});

	


	var Workspace = Backbone.Router.extend({
		routes : {
			//Default path
			'': 'invoiceList',

			//Use of static path
			'invoice': 'invoiceList',
 
			//Use of fragment parameter
			'invoice/:id': 'invoicePage',

			//Use of Backbone.Validation to validate the form
			'validate': 'isvalidate'
		},

		invoiceList: function(){
			var invoiceListView = new InvoiceListView({
				el: 'body'
			});
			invoiceListView.render();
		},

		invoicePage: function(id){
			var invoicePageView = new InvoicePageView({
				el: 'body',
				id: id
			});
			invoicePageView.render();
		},

		isvalidate: function(){
			var buyerModel = new BuyerModel();
			var buyerModelFormView = new BuyerModelFormView({
				el: 'body',
				model: buyerModel
			});

			buyerModelFormView.render();
		}
	});

	$(document).ready(function(){
		
		var invoiceItemModel = new InvoiceItemModel({
			price : 2,
			quantity : 3
		});

		var previewInvoiceItemView = new PreviewInvoiceItemView({
			model: invoiceItemModel,
			el : 'body'
		});

		previewInvoiceItemView.render();
		new Workspace();
		Backbone.history.start();

	});
})(jQuery);