document.addEventListener('DOMContentLoaded', function() {

function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	for (var i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');
	if (name == 'column-template'){
		element.classList.add('col-parent');
	}

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);
	return element;
}

function Column(name) {
	var self = this;

	this.id = randomString();
	this.name = name;
	this.element = generateTemplate('column-template', { name: this.name });
	initSortable(this.element.querySelector('ul') , 'card');
	this.element.querySelector('.column').addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}
		if (event.target.classList.contains('add-card')) {
			self.addCard(new Card(prompt("Введите имя карточки")));
		}
	});
}

Column.prototype = {
	addCard: function(card) {
		this.element.querySelector('ul').appendChild(card.element);
		//initSortable2(card.element.parentNode);
	},
	removeColumn: function() {
		this.element.parentNode.removeChild(this.element);
	}
};

function Card(description) {
	var self = this;
	
	this.id = randomString();
	this.description = description;
	this.element = generateTemplate('card-template', { description: this.description }, 'li');
	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();
		
		if (event.target.classList.contains('btn-delete')) {
			self.removeCard();
		}
	});
}

Card.prototype = {
	removeCard: function() {
		this.element.parentNode.removeChild(this.element);
	}
}

var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.element.appendChild(column.element);
		initSortable(column.element.parentNode, 'kanban');
	},

	element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
	var name = prompt('Введите имя колонки');
	var column = new Column(name);
	board.addColumn(column);
});

function initSortable(el, groupName) {
	var sortable = Sortable.create(el, {
		group: groupName,
		sort: true,
		animation: 150
	});
}

// CREATING COLUMNS
var backlogColumn = new Column('Backlog');
var readyColumn = new Column('Ready');
var codingColumn = new Column('Coding');
var testingColumn = new Column('Testing');
var approvalColumn = new Column('Approval');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(backlogColumn);
board.addColumn(readyColumn);
board.addColumn(codingColumn);
board.addColumn(testingColumn);
board.addColumn(approvalColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card_c = new Card('Организация команды');
var card_b = new Card('Чтение ТЗ и обсуждение сроков');
var card_a = new Card('Подготовка плана разработки');
var card_f = new Card('Выбор шаблона');
var card_e = new Card('Начальные формы');
var card_d = new Card('Прокрутка элементов');
var card_i = new Card('Блок "Требования к ПП"');
var card_h = new Card('Плавность переходов между блоками');
var card_g = new Card('Адаптируемость шаблона к мобильным устройствам');
var card_l = new Card('Блок «Наша разработка»');
var card_k = new Card('Блок «Приветствие»');
var card_j = new Card('Блок «Контакты»');
var card_o = new Card('Фотографии участников');
var card_n = new Card('Блок «Наши партнеры»');
var card_m = new Card('Регистрация домена');
var card_r = new Card('Выбор хостинга');
var card_q = new Card('Блок "Описание разработки»');
var card_p = new Card('Дизайн проекта');

// ADDING CARDS TO COLUMNS
doneColumn.addCard(card_a);
doneColumn.addCard(card_b);
doneColumn.addCard(card_c);
approvalColumn.addCard(card_d);
approvalColumn.addCard(card_e);
approvalColumn.addCard(card_f);
testingColumn.addCard(card_g);
testingColumn.addCard(card_h);
testingColumn.addCard(card_i);
codingColumn.addCard(card_j);
codingColumn.addCard(card_k);
codingColumn.addCard(card_l);
readyColumn.addCard(card_m);
readyColumn.addCard(card_n);
readyColumn.addCard(card_o);
backlogColumn.addCard(card_p);
backlogColumn.addCard(card_q);
backlogColumn.addCard(card_r);

});