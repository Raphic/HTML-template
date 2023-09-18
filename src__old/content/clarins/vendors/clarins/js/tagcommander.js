/* eslint-disable camelcase */
'use strict';

var PRODUCT = 'product';
var SAMPLE = 'sample'
var GIFT = 'gift';
var DEVICE_DESKTOP = 'web';
var DEVICE_TABLET = 'tablet';
var DEVICE_MOBILE = 'mobile';
var WINDOW_WIDTH_DESKTOP = 1024;
var WINDOW_WIDTH_TABLET = 762;

var jQuery = window.jQuery;
var $ = jQuery;

/**
 * @function getUserDevice
 * @description Get users device type.
 * @returns {String}
 */
function getUserDevice() {
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	var device = DEVICE_TABLET;

	if (windowWidth >= WINDOW_WIDTH_DESKTOP) {
		device = DEVICE_DESKTOP;
	} else if (windowWidth < WINDOW_WIDTH_TABLET) {
		device = DEVICE_MOBILE;
	}

	return device;
}

/**
 * @function calculateAge
 * @description Calculates users age based on the birthday.
 * @param {String} birthday
 * @returns {Number}
 */
function calculateAge(birthday) {
	if (birthday === '') {
		return '';
	}

	var today = new Date();
	var birthDate = new Date(birthday);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

/**
 * @function setOrderProduct
 * @description Sets the tag commander variables for each product from the order.
 * @param {Object} transactionType
 * @param {String} sampleProductsID
 * @param {String} giftProductsID
 * @returns {Number} order_count
 */
function setOrderProduct(transactionType, sampleProductsID, giftProductsID) {
	// array with products for the order
	window.tc_vars['order_products'] = [];
	var sampleproduct_id = sampleProductsID;
	var giftproduct_id = giftProductsID;
	var order_count = 0;
	for (var ix = 0; ix < transactionType.line_items.length; ix++) {
		var product = {};

		var item = transactionType.line_items[ix];

		product['order_product_master_id'] = (item !== null && 'id' in item.product) ? item.product.id : '';
		product['order_product_SKU'] = (item !== null && 'sku_code' in item.product) ? item.product.sku_code : '';
		product['order_product_name'] = (item !== null && 'name' in item.product) ? item.product.name : '';
		product['order_product_type'] = (item !== null && 'type' in item.product) ? item.product.type : '';
		product['order_product_bundle_id'] = [];
		if (typeof(item.product.bundled_products) !== 'undefined') {
			for (var ix2 = 0; ix2 < item.product.bundled_products.length; ix2++) {
				product['order_product_bundle_id'].push(item.product.bundled_products[ix2]);
			}
		}

		product['order_product_quantity'] = (item !== null && 'quantity' in item) ? item.quantity : '';
		order_count += item.quantity;
		product['order_engraving_message'] = (item !== null && 'engraving' in item.product) ? item.product.engraving : '';
		product['order_product_unitprice_ati'] = (item.subtotal_with_tax / item.quantity).toFixed(2);
		product['order_product_discount_ati'] = '';
		product['order_product_unitprice_tf'] = (item.subtotal / item.quantity).toFixed(2);
		product['order_product_discount_tf'] = (item.product.unit_price - item.product.unit_sale_price).toFixed(2);
		product['order_product_originalPrice_ati'] = item.product.unit_price.toFixed(2) || '';
		product['order_product_trademark'] = (item !== null && 'manufacturer' in item.product) ? item.product.manufacturer : '';
		var orderProductLine = item.product.line;
		if (typeof(orderProductLine) !== 'undefined' && orderProductLine !== null && orderProductLine.length > 0) {
			product['order_product_line'] = orderProductLine;
		}
		product['order_product_url_page'] = (item !== null && 'url' in item.product) ? item.product.url : '';
		product['order_product_url_picture'] = (item !== null && 'image_url' in item.product) ? item.product.image_url : '';
		product['order_product_breadcrumb_id'] = (item !== null && 'breadcrumb_id' in item.product) ? item.product.breadcrumb_id : '';
		product['order_product_breadcrumb_label'] = (item !== null && 'breadcrumb_label' in item.product) ? item.product.breadcrumb_label : '';
		product['order_product_rating'] = (item !== null && 'bvAvRating' in item.product) ? item.product.bvAvRating : '';
		product['product_nb_reviews'] = (item && item.product.bazaarvoiceReviewCount) || '';
		product['order_product_instock'] = (item.product.stock > 0) ? 'yes' : 'no';
		product['product_category'] = (item !== null && 'category' in item.product && item.product.category !== null) ? item.product.category : '';
		product['product_texture'] = (item !== null && 'texture' in item.product) ? item.product.texture : '';
		product['product_concern'] = (item !== null && 'concern' in item.product) ? item.product.concern : '';
		product['product_marketing_tag'] = (item !== null && 'badge' in item.product) ? item.product.badge : '';
		product['product_brand'] = (item !== null && 'product_brand' in item.product) ? item.product.product_brand : '';
		if (sampleproduct_id.indexOf(item.product.sku_code) !== -1) {
			product['product_sample_gift'] = SAMPLE;
		} else if (giftproduct_id.indexOf(item.product.sku_code) !== -1) {
			product['product_sample_gift'] = GIFT;
		} else {
			product['product_sample_gift'] = PRODUCT;
		}
		window.tc_vars['order_products'].push(product);
	}

	return order_count;
}

/**
 * @function initPageVariables
 * @description Initialize the page tag commander variables.
 */
function initPageVariables() {
	var page = (window.universal_variable && window.universal_variable.page) || {};
	var lang = page.language || '';

	window.tc_vars['env_template'] = page.template;
	window.tc_vars['env_channel'] = getUserDevice();
	window.tc_vars['env_language'] = lang.substring(0, 2);
	window.tc_vars['env_country'] = page.country;
	window.tc_vars['page_cat1'] = page.page_cat1 || page.subcategory || page.category || '';
	window.tc_vars['page_cat2'] = page.page_cat2 || '';
	window.tc_vars['page_cat3'] = page.page_cat3 || '';
	window.tc_vars['page_cat4'] = page.page_cat4 || '';
	window.tc_vars['page_error'] = page.error || '';
	window.tc_vars['page_type'] = page.page_type || '';
	window.tc_vars['currency'] = page.currency || '';

	// page title
	window.tc_vars['page_name'] = window.document.title;

	//page environment
	var hostMapping = {
		'dev': 'development',
		'sta': 'staging'
	};

	var host = window.location.host;
	host = host.substring(0, 3);
	host = host in hostMapping ? hostMapping[host] : 'production';
	window.tc_vars['env_work'] = host;
}

/**
 * @function initUserVariables
 * @description Initialize the users tag commander variables.
 */
function initUserVariables() {
	if (typeof(window.universal_variable) !== 'undefined' && 'user' in window.universal_variable) {
		var user = (typeof(window.universal_variable.user) !== 'undefined') ? window.universal_variable.user : {};

		window.tc_vars['env_dnt'] = (user !== null && 'do_not_track' in user) ? user.do_not_track : '';
		window.tc_vars['user_id'] = (user !== null && 'user_id' in user) ? user.user_id : '';
		window.tc_vars['user_logged'] = (user !== null  && 'user_logged' in user) ? user.user_logged : '';
		window.tc_vars['user_gender'] = (user !== null && 'gender' in user) ? user.gender : '';
		window.tc_vars['user_email'] = (user !== null && 'email' in user) ? user.email : '';
		window.tc_vars['user_optin'] = (user !== null && 'optedin' in user) ? user.optedin : '';
		window.tc_vars['user_category'] = (user !== null && 'category' in user) ? user.category : '';
		window.tc_vars['user_country'] = (user !== null && 'country' in user) ? user.country : '';

		// user registration date
		window.tc_vars['user_insc_date'] = (user !== null && 'insc_date' in user) ? user.insc_date : '';
		// date of last order
		window.tc_vars['user_last_order'] = (user !== null && 'last_order' in user) ? user.last_order : ' ';
		// Order count
		window.tc_vars['user_frequency'] = (user !== null && 'user_frequency' in user) ? user.user_frequency : '';
		// All tax included, without shipping
		window.tc_vars['user_orders_amount_history_ati_without_sf'] = (user !== null && user.ati_without_sf) ? user.ati_without_sf.toFixed(2) : 0;
		// All tax included, with shipping
		window.tc_vars['user_orders_amount_history_ati_with_sf'] = (user !== null && user.ati_with_sf) ? user.ati_with_sf.toFixed(2) : 0;
		// Tax Free without shipping
		window.tc_vars['user_orders_amount_history_tf_without_sf'] = (user !== null && user.tf_without_sf) ? user.tf_without_sf.toFixed(2) : 0;
		// Tax Free with shipping
		window.tc_vars['user_orders_amount_history_tf_with_sf'] = (user !== null && user.tf_with_sf) ? user.tf_with_sf.toFixed(2) : 0;
		// Tax
		window.tc_vars['user_orders_amount_history_tax'] = (user !== null && user.tax) ? user.tax.toFixed(2) : 0;
		// User company name
		window.tc_vars['user_company_name'] = (user !== null && 'company_name' in user) ? user.company_name : '';
		// User first name
		window.tc_vars['user_first_name'] = (user !== null && 'first_name' in user) ? user.first_name : '';
		// User last name
		window.tc_vars['user_last_name'] = (user !== null && 'last_name' in user) ? user.last_name : '';
		// User DOB
		window.tc_vars['user_date_birth'] = (user !== null && 'date_birth' in user) ? user.date_birth : '';
		window.tc_vars['user_age'] = calculateAge(window.tc_vars['user_date_birth']);
		// User Loyalty points
		window.tc_vars['user_loyalty_points'] = (user !== null && 'loyalty_points' in user) ? user.loyalty_points : '';
		// User Loyalty points expiration
		window.tc_vars['user_loyalty_pointsexpiration'] = (user !== null && 'loyalty_pointsexpiration' in user) ? user.loyalty_pointsexpiration : '';

		window.tc_vars['user_address'] = [];
		for (var ix = 0; ix < user.line_items.length; ix++) {
			var address = {};

			var item = user.line_items[ix];
			address['user_address_name'] = item.name;
			address['user_address_street'] = item.street;
			address['user_address_city'] = item.city;
			address['user_address_postal'] = item.postalCode;
			address['user_address_state'] = item.stateCode;
			address['user_address_country'] = item.countryCode;

			window.tc_vars['user_address'].push(address);
		}
		window.tc_vars['logged_with'] = (user !== null && 'logged_with' in user) ? (user.logged_with) : '';
		window.tc_vars['clarins_contact_id'] = user && user.clarins_contact_id ? user.clarins_contact_id : '';

		if (user && user.user_loyalty) {
			window.tc_vars['user_loyalty'] = user.user_loyalty;
		}
	}
}

/**
 * @function initProductVariables
 * @description Initialize the product tag commander variables.
 */
function initProductVariables() {
	if (typeof(window.universal_variable) !== 'undefined' && 'product' in window.universal_variable) {
		var products = (typeof(window.universal_variable.product) !== 'undefined') ? window.universal_variable.product : {};

		window.tc_vars['product_master_id'] = (products !== null && 'id' in products) ? products.id : '';
		window.tc_vars['product_SKU'] = (products !== null && 'sku_code' in products) ? products.sku_code : ''; // product ID
		window.tc_vars['product_name'] = (products !== null && 'name' in products) ? products.name : '';
		window.tc_vars['product_category'] = (products !== null && 'category' in products && products.category !== null) ? products.category : '';
		window.tc_vars['product_size'] = (products !== null && 'size' in products) ? products.size : '';
		window.tc_vars['product_color'] = (products !== null && 'color' in products) ? products.color : '';
		window.tc_vars['product_type'] = (products !== null && 'type' in products) ? products.type : '';
		window.tc_vars['product_short_description'] = (products !== null && 'short_description' in products) ? products.short_description : '';
		window.tc_vars['product_long_description'] = (products !== null && 'long_description' in products) ? products.long_description : '';
		window.tc_vars['product_texture'] = (products !== null && 'texture' in products) ? products.texture : '';

		var unit_price = (products !== null && 'unit_price' in products) ? products.unit_price : 0;
		var unit_sale_price = (products !== null && 'unit_sale_price' in products) ? products.unit_sale_price : 0;

		// Original Unit Price All Tax Included
		window.tc_vars['product_original_price_ati'] = unit_price.toFixed(2);
		// Discount will all taxes included
		window.tc_vars['product_discount_ati'] = (unit_price - unit_sale_price).toFixed(2);
		// Price with all taxes included
		window.tc_vars['product_current_price_ati'] = unit_sale_price.toFixed(2);
		// Original Unit Price Tax Free
		window.tc_vars['product_original_price_tf'] = (unit_price - unit_price * products.tax).toFixed(2);
		// Discount with no taxes
		window.tc_vars['product_discount_tf'] = ((unit_price - unit_sale_price) > 0) ? (unit_price - unit_price * products.tax - unit_sale_price - unit_sale_price * products.tax).toFixed(2) : '0.00';
		// Price with no taxes
		window.tc_vars['product_current_price_tf'] = (unit_sale_price - unit_sale_price * products.tax).toFixed(2);
		// Discount percentage
		window.tc_vars['product_discount_porcentage'] = (100 - unit_sale_price / unit_price * 100).toFixed(2);
		window.tc_vars['product_currency'] = (products !== null && 'currency' in products) ? products.currency : '';
		window.tc_vars['product_url_page'] = (products !== null && 'url' in products) ? products.url : '';
		window.tc_vars['product_url_picture'] = (products !== null && 'image_url' in products) ? products.image_url : '';
		window.tc_vars['product_instock'] = (products !== null && products.stock > 0) ? 'yes' : 'no';
		window.tc_vars['product_instock_number'] = (products !== null && 'stock' in products) ? products.stock : 0;
		window.tc_vars['product_trademark'] = (products !== null && 'trademark' in products) ? products.trademark : '';
		window.tc_vars['product_breadcrumb_id'] = (products !== null && 'breadcrumb_id' in products) ? products.breadcrumb_id : '';
		window.tc_vars['product_breadcrumb_label'] = (products !== null && 'breadcrumb_label' in products) ? products.breadcrumb_label : '';
		// Is product available
		window.tc_vars['product_instock'] = (products !== null && products.stock > 0) ? 'yes' : 'no';
		// Product availability
		window.tc_vars['product_instock_number'] = (products !== null && 'stock' in products) ? products.stock : '';
		// Can the product be wrapped in package
		window.tc_vars['product_ispackage'] = (products !== null && 'ispackage' in products) ? products.ispackage : '';
		// Product total number of reviews
		window.tc_vars['product_rating_total'] = (products !== null && 'bvNoOfReviews' in products) ? products.bvNoOfReviews : '';
		// Product average rating
		window.tc_vars['product_rating'] = (products !== null && 'bvAvRating' in products) ? products.bvAvRating : '';
		window.tc_vars['product_concern'] = (products !== null && 'concern' in products) ? products.concern : '';
		window.tc_vars['product_marketing_tag'] = (products !== null && 'badge' in products) ? products.badge : '';

		window.tc_vars['product_bundle_id'] = [];
		if (products !== null && typeof(products.bundled_products) !== 'undefined') {
			for (var ix = 0; ix < products.bundled_products.length; ix++) {
				window.tc_vars['product_bundle_id'].push(products.bundled_products[ix]);
			}
		}

		window.tc_vars['product_related_products'] = [];
		if (products !== null) {
			for (var ix = 0; ix < products.related_items.length; ix++) {
				var related_product = {};

				var item = products.related_items[ix];

				related_product['product_related_master_id'] = item.sku_code;
				related_product['product_related_master_name'] = item.name;

				if (typeof(item.price) !== 'undefined') {
					related_product['product_related_master_price'] = item.price.toFixed(2);
				} else {
					related_product['product_related_master_price'] = 0;
				}

				window.tc_vars['product_related_products'].push(related_product);
			}
		}

		window.tc_vars['product_related_must_have_products'] = [];
		if (products !== null) {
			for (var ix = 0; ix < products.related_must_have_items.length; ix++) {
				var related_must_have_product = {};

				var item = products.related_must_have_items[ix];

				related_must_have_product['product_related_master_id'] = item.sku_code;
				related_must_have_product['product_related_master_name'] = item.name;
				related_must_have_product['product_related_master_price'] = item.price.toFixed(2);

				window.tc_vars['product_related_must_have_products'].push(related_must_have_product);
			}
		}

		window.tc_vars['product_related_been_seen'] = [];
		if (products !== null) {
			for (var ix = 0; ix < products.last_visited.length; ix++) {
				var last_visited = {};

				var item = products.last_visited[ix];

				last_visited['product_related_master_id'] = item.sku_code;
				last_visited['product_related_master_name'] = item.name;
				last_visited['product_related_master_price'] = item.price.toFixed(2);

				window.tc_vars['product_related_been_seen'].push(last_visited);
			}
		}
	}
}

/**
 * @function initTransactionVariables
 * @description Initialize transaction tag commander variables for basket or transaction object.
 * @param {String} transactionType
 */
function initTransactionVariables(transactionType) {
	var user = (typeof(window.universal_variable.user) !== 'undefined') ? window.universal_variable.user : {};

	// order total with all taxes without shipping fee
	window.tc_vars['order_amount_ati_without_sf'] = (transactionType.total - transactionType.shipping_cost_total).toFixed(2);
	// order total with all taxes with shipping fee
	window.tc_vars['order_amount_ati_with_sf'] = (transactionType.total).toFixed(2);
	// total without discount
	if (transactionType.order_normal_total !== undefined) {
		window.tc_vars['order_normal_total'] = transactionType.order_normal_total.toFixed(2);
	}
	// total discount
	window.tc_vars['order_discount'] = (transactionType.merchandize_total - transactionType.merchandize_total_adjusted).toFixed(2);
	// shipping price with all taxes
	window.tc_vars['order_ship_ati'] = transactionType.shipping_cost_total.toFixed(2);
	// order total tax free without shipping fee
	window.tc_vars['order_amount_tf_without_sf'] = (transactionType.total_net).toFixed(2);
	// order total tax
	window.tc_vars['order_tax'] = transactionType.tax.toFixed(2);
	// order total tax free and with shipping fee
	window.tc_vars['order_amount_tf_with_sf'] = (transactionType.total_net + (transactionType.shipping_cost_total - transactionType.shipping_tax)).toFixed(2);
	// discount tax free
	window.tc_vars['order_discount_tf'] = (transactionType.merchandize_net - transactionType.merchandize_net_adjusted).toFixed(2);
	// order shipping fee tax free
	window.tc_vars['order_ship_tf'] = (transactionType.shipping_cost_total - transactionType.shipping_tax).toFixed(2);
	// yes / no - is a new customer
	window.tc_vars['order_newcustomer'] = (user !== null && user !== undefined && user.has_transacted) ? 'no' : 'yes';
	// guest/not
	window.tc_vars['order_is_guest'] = (user !== null && 'user_logged' in user && user.user_logged === 'no') ? 'yes' : 'no';
	// user gender
	window.tc_vars['order_gender'] = (user !== null && 'gender' in user) ? user.gender : '';
	// currency of the order
	window.tc_vars['order_currency'] = ('currency' in transactionType) ? transactionType.currency : '';
	// can be gift wrapped
	window.tc_vars['order_is_a_gift'] = ('is_gift_set' in transactionType) ? transactionType.is_gift_set : '';
	// is order with a gift
	window.tc_vars['order_is_a_gift_wrap'] = 'can_be_gift' in transactionType && transactionType.can_be_gift ? 'yes' : 'no';
	// is order with a gift message
	window.tc_vars['order_is_a_gift_custom_message'] = ('gift_message' in transactionType) ? transactionType.gift_message : '';
	// payment method
	window.tc_vars['order_payment_methods'] = ('payment_method' in transactionType) ? transactionType.payment_method : '';
	// shipping method
	window.tc_vars['order_shipping_method'] = ('shipping_method' in transactionType) ? transactionType.shipping_method : '';
	// order status
	window.tc_vars['order_status'] = ('order_status' in transactionType) ? transactionType.order_status : '';
	// order user status
	var pageCategory = window.universal_variable.page.category;
	if (pageCategory === 'Checkout Confirmation' || pageCategory === 'Guest Checkout Confirmation') {
		window.tc_vars['order_user_state'] = (user !== null && user !== undefined && 'user_state' in user) ? user.user_state : 'guest';
	}
	// array with sample products for the order
	window.tc_vars['order_sample_products'] = [];
	var sample_products_count = 0;

	var sampleproduct_id = [];

	for (var ix = 0; ix < transactionType.sampleproduct.length; ix++) {
		var product = {};

		var item = transactionType.sampleproduct[ix];
		sampleproduct_id.push(item.id);
		product['order_sample_product_master_id'] = (item !== null && 'id' in item) ? item.id : '';
		product['order_sample_product_name'] = (item !== null && 'name' in item) ? item.name : '';
		product['order_sample_product_capacity'] = (item !== null && 'capacity' in item) ? item.capacity : '';
		product['order_sample_product_category'] = (item !== null && 'category' in item) ? item.category : '';
		product['order_sample_product_trademark'] = (item !== null && 'brand' in item) ? item.brand : '';
		product['order_sample_product_url_page'] = (item !== null && 'url' in item) ? item.url : '';
		product['order_sample_product_url_picture'] = (item !== null && 'image_url' in item) ? item.image_url : '';
		product['product_sample_gift'] = SAMPLE;
		sample_products_count += item.quantity;
		window.tc_vars['order_sample_products'].push(product);
	}
	window.tc_vars['order_sample_products_number'] = sample_products_count;

	// array with gift products for the order
	window.tc_vars['order_chosen_gift'] = [];

	var giftproduct_id = [];

	for (var ix = 0; ix < transactionType.giftproduct.length; ix++) {
		var product = {};

		var item = transactionType.giftproduct[ix];
		giftproduct_id.push(item.id);
		product['order_chosen_gift_id'] = (item !== null && 'id' in item) ? item.id : '';
		product['order_chosen_gift_name'] = (item !== null && 'name' in item) ? item.name : '';
		product['order_chosen_gift_category'] = (item !== null && 'brand' in item) ? item.brand : '';
		product['order_chosen_gift_trademark'] = (item !== null && 'brand' in item) ? item.brand : '';
		product['order_chosen_gift_url_page'] = (item !== null && 'url' in item) ? item.url : '';
		product['order_chosen_gift_picture'] = (item !== null && 'image_url' in item) ? item.image_url : '';
		product['product_sample_gift'] = GIFT;
		window.tc_vars['order_chosen_gift'].push(product);
	}
	// array with sample products for the order
	window.tc_vars['order_ecards'] = [];

	for (var ix = 0; ix < transactionType.giftcertificates.length; ix++) {
		var product = {};

		var item = transactionType.giftcertificates[ix];
		product['order_payment_ecard_number'] = item.code;
		product['order_payment_ecard_amount'] = item.amount;
		window.tc_vars['order_ecards'].push(product);
	}

	// set products for the order
	window.tc_vars['order_products_number'] = setOrderProduct(transactionType, sampleproduct_id, giftproduct_id);
}

/**
 * @function initCheckoutVariables
 * @description Initialize the checkout tag commander variables.
 */
function initCheckoutVariables() {
	if (typeof(window.universal_variable) !== 'undefined' && 'transaction' in window.universal_variable) {
		var user = (typeof(window.universal_variable.user) !== 'undefined') ? window.universal_variable.user : {};
		var transaction = (typeof(window.universal_variable.transaction) !== 'undefined') ? window.universal_variable.transaction : {};

		initTransactionVariables(transaction);

		window.tc_vars['order_id'] = (transaction !== null && 'order_id' in transaction) ? transaction.order_id : ''; // order number
		window.tc_vars['order_email'] = (transaction !== null && 'delivery' in transaction) ? transaction.delivery.confirmation_email : '';
		window.tc_vars['shipping_destination'] = (transaction && transaction.delivery && transaction.delivery.country) || '';
		// opted in
		window.tc_vars['order_email_optin'] = (user !== null && 'optedin' in user) ? user.optedin : '';

		window.tc_vars['order_promos_code'] = [];
		var transactionPromocodesLength = (transaction !== null && 'promo_code' in transaction) ? transaction.promo_code.length : 0;
		if (transactionPromocodesLength > 0) {
			var transactionPromocodes = transaction.promo_code.split(',');
			var transactionPromocodesArrLength = transactionPromocodes.length;
			for (var i = 0; i < transactionPromocodesArrLength; i++) {
				var promoCode = transactionPromocodes[i];
				window.tc_vars['order_promos_code'].push({'order_promo_code': promoCode});
				if (transaction.loyalty_code_prefix && (promoCode.indexOf(transaction.loyalty_code_prefix) === 0)) {
					window.tc_vars['voucher_code'] = promoCode;
				} else {
					window.tc_vars['coupon_code'] = promoCode;
				}
			}
		}
	} else if (typeof(window.universal_variable) !== 'undefined' && 'basket' in window.universal_variable) {
		var basket = (typeof(window.universal_variable.basket) !== 'undefined') ? window.universal_variable.basket : {};

		initTransactionVariables(basket);
		// Basket UUID
		window.tc_vars['basket_id'] = basket.id;
		// Order number
		window.tc_vars['order_id'] = '';
		// Email for the order
		window.tc_vars['order_email'] = ('attributes' in basket && 'delivery' in basket.attributes && 'confirmation_email' in basket.attributes.delivery) ? basket.attributes.delivery.confirmation_email : '';

		window.tc_vars['order_promos_code'] = [];
		for (var ix = 0; ix < basket.coupon_items.length; ix++) {
			var product = {};
			var item = basket.coupon_items[ix];

			product['order_promo_code'] = item.code_id;
			product['order_promo_name'] = [];

			if (typeof(item.promotions) !== 'undefined') {
				for (var ix2 = 0; ix2 < item.promotions.length; ix2++) {
					product['order_promo_name'].push(item.promotions[ix2]);
				}
			}
			window.tc_vars['order_promos_code'].push(product);
		}
	}
}

/**
 * @function initListingPageVariables
 * @description Initialize the tag commander variables on the product listing pages.
 */
function initListingPageVariables() {
	if (typeof(window.universal_variable) !== 'undefined' && 'listing' in window.universal_variable) {
		var listing = (typeof(window.universal_variable.listing) !== 'undefined') ? window.universal_variable.listing : {};

		window.tc_vars['search_keywords'] = (listing !== null && 'query' in listing) ? listing.query : '';
		window.tc_vars['search_page_number'] = (listing !== null && 'current_page' in listing) ? listing.current_page + 1 : '';
		window.tc_vars['search_filters'] = (listing !== null && 'search_filters' in listing) ? listing.search_filters : '';
		window.tc_vars['store_locator_search_field'] =  (listing !== null && 'store_locator_search_field' in listing) ? listing.store_locator_search_field : '';
		window.tc_vars['search_results_number'] = (listing !== null && 'items_count' in listing) ? listing.items_count : '';
		window.tc_vars['list_products'] = [];
		for (var ix = 0; ix < listing.items.length; ix++) {
			var product = {};
			var item = listing.items[ix];

			product['position'] = (item !== null && 'position' in item) ? ix + 1 : '';
			product['list_product_master_SKU'] = (item !== null && 'id' in item) ? item.id : '';
			product['list_product_SKU'] = (item !== null && 'sku_code' in item) ? item.sku_code : '';
			product['list_product_name'] = (item !== null && 'name' in item) ? item.name : '';
			product['list_product_type'] = (item !== null && 'type' in item) ? item.type : '';
			product['list_product_category'] = (item !== null && 'category' in item) ? item.category : '';

			product['list_product_bundle_id'] = [];
			if (typeof(item.bundled_products) !== 'undefined') {
				for (var ix2 = 0; ix2 < item.bundled_products.length; ix2++) {
					product['list_product_bundle_id'].push(item.bundled_products[ix2]);
				}
			}
			var unit_price = (item !== null && 'unit_price' in item) ? item.unit_price : 0;
			var unit_sale_price = (item !== null && 'unit_sale_price' in item) ? item.unit_sale_price : 0;
			product['list_engraving_message'] = (item !== null && 'engraving' in item) ? item.engraving : '';
			product['list_product_unitprice_ati'] = unit_sale_price.toFixed(2);
			product['list_product_discount_ati'] = (unit_price - unit_sale_price).toFixed(2);
			product['list_product_unitprice_tf'] = (unit_sale_price - unit_sale_price * item.tax).toFixed(2);
			product['list_product_discount_tf'] = ((unit_price - unit_sale_price) > 0) ? (unit_price - unit_price * item.tax - unit_sale_price - unit_sale_price * item.tax).toFixed(2) : '0.00';
			product['list_product_originalPrice_ati'] = (item !== null && 'list_product_originalPrice_ati' in item) ? unit_price.toFixed(2) : '';
			product['list_product_trademark'] = (item !== null && 'manufacturer' in item) ? item.manufacturer : '';
			product['list_product_url_page'] = (item !== null && 'url' in item) ? item.url : '';
			product['list_product_url_picture'] = (item !== null && 'image_url' in item) ? item.image_url : '';
			product['list_product_breadcrumb_id'] = (item !== null && 'breadcrumb_id' in item) ? item.breadcrumb_id : '';
			product['list_product_breadcrumb_label'] = (item !== null && 'breadcrumb_label' in item) ? item.breadcrumb_label : '';
			product['list_product_rating'] = (item !== null && 'bvAvRating' in item) ? item.bvAvRating : '';
			product['list_product_instock'] = (item !== null && 'stock' in item && item.stock > 0) ? 'yes' : 'no';
			product['list_product_quantity'] = (item !== null && 'stock' in item) ? item.stock : '';
			product['list_product_breadcrumb_id'] = (item !== null && 'breadcrumb_id' in item) ? item.breadcrumb_id : '';
			product['list_product_breadcrumb_label'] = (item !== null && 'breadcrumb_label' in item) ? item.breadcrumb_label : '';
			product['product_id'] = (item !== null && 'product_id' in item) ? item.product_id : '';
			product['product_category'] = (item !== null && 'category' in item) ? item.category : '';
			product['product_texture'] = '';
			product['product_concern'] = (item !== null && 'concern' in item) ? item.concern : '';
			product['product_marketing_tag'] = (item !== null && 'badge' in item) ? item.badge : '';
			product['product_brand'] = (item !== null && 'texture' in item) ? item.texture : '';

			window.tc_vars['list_products'].push(product);
		}
	}
}

/**
 * @function buildTcHelpers
 * @description Initialize the tag commander variables on the product listing pages.
 */
function buildTcHelpers() {
	window.tc_helpers = {};
	window.tc_helpers.buildWishListContext = function () {
		return {
			add_product_id: window.universal_variable.product.id,
			add_product_name: window.universal_variable.product.name,
			add_product_unitprice_ati: window.universal_variable.product.unit_price,
			add_product_unitprice_tf: window.universal_variable.product.unit_price,
			add_product_currency: window.universal_variable.product.currency
		};
	}

	window.tc_helpers.buildCartContext = function (thisProduct) {
		return {
			add_product_id: window.universal_variable.product.id,
			add_product_name: window.universal_variable.product.name,
			add_product_unitprice_ati: window.universal_variable.product.unit_price,
			add_product_unitprice_tf: window.universal_variable.product.unit_price,
			add_product_unitprice_quantity: thisProduct.selectedOptions.Quantity,
			add_product_currency: window.universal_variable.product.currency
		};
	}

	window.tc_helpers.buildNewsletterContext = function () {
		return ;
	}
}

/**
 * @function initTagcommanderEvents
 * @description Initialize the tag commander variables on the product listing pages.
 */
function initTagcommanderEvents() {
	if (window.tc_tag_event && !window.tc_tag_events_bound) {
		jQuery(document).ready(function () {
			jQuery('#bottomNewsLetterForm button').bind('click', function () {
				var tcContext = {
					has_subscribed_origin: 'Footer',
					has_subscribed_email: jQuery('#bottomNewsLetterForm input').val()
				};
				if (window.tc_tag_event) {window.tc_tag_event('SignUp', tcContext, this);}
			});

			jQuery('.newsletterholder .signup-button input[name=newsletter-email]').bind('click', function () {
				var tcContext = {
					has_subscribed_origin: 'Special offers',
					has_subscribed_email: jQuery('.newsletterholder .email-field input[name=newsletter-email]').val()
				};
				if (window.tc_tag_event) {window.tc_tag_event('SignUp', tcContext, this);}
			});


			jQuery('.addtocart button.addtocartbutton').bind('click', function () {
				var quantity = 0;

				var qDesktop = jQuery('#msdrpdd20_msdd #msdrpdd20_titletext span');
				if (qDesktop.length > 0) {qDesktop = $.trim(qDesktop.text());}

				var qMobile = jQuery('#quantity');
				if (qMobile.length > 0) {qMobile = qMobile.val();}

				var tmgRedesign = jQuery('#msdrpdd20_msdd #msdrpdd20_title span.ddlabel');
				if (tmgRedesign.length > 0) {tmgRedesign = $.trim(tmgRedesign.text());}

				quantity = qDesktop;
				if (!quantity || quantity === '') {quantity = qMobile;}
				if (!quantity || quantity === '') {quantity = tmgRedesign;}


				var tcContext = {
					add_product_id: window.universal_variable.product.id,
					add_product_name: window.universal_variable.product.name,
					add_product_unitprice_ati: window.universal_variable.product.unit_price,
					add_product_unitprice_tf: window.universal_variable.product.unit_price,
					add_product_unitprice_quantity: quantity,
					add_product_currency: window.universal_variable.product.currency
				};

				if (window.tc_tag_event) {window.tc_tag_event('AddToCart', tcContext, this);}
			});

			jQuery('.addtowishlist>a').bind('click', function () {
				var tcContext = {
					add_product_id: window.universal_variable.product.id,
					add_product_name: window.universal_variable.product.name,
					add_product_unitprice_ati: window.universal_variable.product.unit_price,
					add_product_unitprice_tf: window.universal_variable.product.unit_price,
					add_product_currency: window.universal_variable.product.currency
				};

				window.tc_tag_event('AddToWishlist', tcContext, this);
			});



			jQuery('button[name=\'dwfrm_cart_chooseSamples\'], .cart button[name=\'dwfrm_cart_checkoutCart\']').bind('click', function () {
				var tcContext = {
					checkout_step: 'Samples'
				};

				window.tc_tag_event('Checkout', tcContext, this);
			});

			jQuery(
				'.continuecheckoutbutton > button, ' +
				'button[name=\'dwfrm_login_login\'], ' +
				'button[name=\'dwfrm_login_register\'], ' +
				'button[name=\'dwfrm_login_unregistered\'], ' +
				'button[name=\'dwfrm_singleshipping_shippingAddress_save\'], ' +
				'button[name=\'dwfrm_billing_save\']'
			).bind('click', function () {
				var stepDesktop = jQuery('#menuContainerWrapper #navigation ul > li.selected');
				if (stepDesktop.length > 0) {stepDesktop = $.trim(stepDesktop.next().text());}
				var stepMobile = jQuery('.checkout #menu_container ul.clearfix > li.selected');
				if (stepMobile.length > 0) {stepMobile = $.trim(stepMobile.next().text());}

				var step = (!stepDesktop || stepDesktop === '') ? stepMobile : stepDesktop;
				var tcContext = {checkout_step: step};
				window.tc_tag_event('Checkout', tcContext, this);
			});

			jQuery('.checkoutplaceorder form button[name=\'submit\']').bind('click', function () {
				var tcContext = {
					checkout_step: jQuery('.checkoutplaceorder form button[name=\'submit\']').val()
				};
				window.tc_tag_event('Checkout', tcContext, this);
			});

		});
		window.tc_tag_events_bound = true;
	}
}

/**
 * @function initTCVariables
 * @description Initialize all tag commander variables.
 */
function initTCVariables() {
	window.tc_vars = window.tc_vars ? window.tc_vars : {};
	initPageVariables();
	initUserVariables();
	initProductVariables();
	initCheckoutVariables();
	initListingPageVariables();
}
/**
 * @function init
 */
function init() {
	initTCVariables();
	buildTcHelpers();
	initTagcommanderEvents();
}

init();