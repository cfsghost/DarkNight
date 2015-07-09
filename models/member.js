var mongoose = require('mongoose');

var Member = new mongoose.Schema({
	name: String,
	gender: Number,
	birthday: Date,
	hashname: { type: String },
	email: { type: String, unique: true },
	phone: String,
	idno: String,
	password: String,
	salt: String,
	cardno: Number,
	tokens: [ String ],
	awards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MemberAward' }],
	points: Number,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

Member.methods.validPassword = function(password) {
    return (this.password == password) ? true : false;
};

module.exports = mongoose.model('Member', Member);
