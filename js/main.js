(function($){

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