define(
'widgets/RateAndComment', 
['dojo/_base/declare',
'dojo/dom-construct', 
'dojo/_base/array',
'dijit',
'dijit/_Widget',
'dijit/_TemplatedMixin',
'dijit/_WidgetsInTemplateMixin',
'dojo/data/ItemFileWriteStore',
'dojo/text!dojoExercise/widgets/templates/RateAndComment.html',
'dojox/form/Rating',
'dijit/form/Textarea',
'dijit/Dialog',
'dijit/form/Button',
'dijit/TitlePane'

], function(declare, domConstruct, domArray, dijit, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, dojoFileWrite, template) {
	return declare("widgets.RateAndComment", [ dijit._Widget,
			dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin ],
			{
				// Path to the template
				templateString : template,

				rcStore : new dojoFileWrite({
					data : {
						items : []
					}
				}),

				constructor : function() {

				},

				getCountry : function()
				{
					return this.country.get('value');
				},

				getEmployer : function() {
					return this.employer.get('value');
				},

				getComment : function() {
					return this.comments.get('value');
				},

				getRating : function() {
					return this.rating.get('value');
				},

				setComment : function(value) {
					this.comments.set("value", value);
				},

				setRating : function(value) {
					this.rating.set("value", value);
				},

				setEmployer : function(value) {
					this.employer.set("value", value);
				},

				setCountry : function(value) {
					this.country.set("value", value);
				},

				showFeedbackTools : function() {
					this.dialogbox.show();
				},

				saveFeedback : function() {
					
					var userCountry = this.getCountry();
					var userRating = this.getRating();
					var userComment = this.getComment();
					var userEmployer = this.getEmployer();
					
					this.rcStore.newItem({
						country: this.getCountry,
						employer : this.userEmployer,
						comment : userComment,
						rating : userRating,
					});
					
					domConstruct.create("li", {
						innerHTML : "<b>Country: </b> " + userCountry + "<b> Employer:</b>" + userEmployer + " <b>Rating:</b>" + 
								+ userRating + "<br> <b>Comments:</b> " + userComment
					}, this.feedbacklist);
					
					this.dialogbox.hide();
					this.setComment("");
					this.setCountry();
					this.setEmployer("");
					this.setRating();
					this.setRating(0);
				},
				
				getCommentsBy : function() {
					var comments = [];
					var store = this.rcStore;
					this.rcStore.fetch({
						onComplete : function(items, request) {
							domArray.forEach(items, function(item) {
								comments.push(store.getValue(item, "comment"));
							});
						}
					});

					return comments;
				},

				postMixInProperties : function() {
				},

				postCreate : function() {
				}
			});
});