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

	});
})(jQuery);