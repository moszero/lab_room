(function (jQuery) {
    $.opt = {};  // jQuery Object

    jQuery.fn.invoice = function (options) {
        var ops = jQuery.extend({}, jQuery.fn.invoice.defaults, options);
        $.opt = ops;

        var inv = new Invoice();
        inv.init();

        jQuery('body').on('click', function (e) {
            // alert("hello");
            var cur = e.target.id || e.target.className;

            if (cur == $.opt.pudith_minus.substring(1))
                inv.minusRow(e.target);

            if (cur == $.opt.pudith_plus.substring(1))
                inv.plusRow(e.target);

            if (cur == $.opt.addRow.substring(1))
                inv.newRow();

            if (cur == $.opt.delete.substring(1))
                inv.deleteRow(e.target);

            inv.init();
        });

        jQuery('body').on('keyup', function (e) {
            inv.init();
        });

        return this;
    };
}(jQuery));

function Invoice() {
    self = this;
}

Invoice.prototype = {
    constructor: Invoice,

    init: function () {
        this.buttonDiscount();
        this.discountPrice();
        this.calcTotal();
        this.calcTotalQty();
        this.calcSubtotal();
        this.calcGrandTotal();
//        this.calcPaidAmount();
        this.calcRemainingAmount();
        this.calcReturnedAmount();
    },

    /**
     * Calculate total price of an item.
     *
     * @returns {number}
     */

     // minusRow: function (elem) {
     //     var prev_val = parseInt(jQuery(elem).siblings($.opt.qty).val());
     //     if (prev_val<=1) {
     //         return 1;
     //     }
     //     jQuery(elem).siblings($.opt.qty).val(prev_val-1);
     //
     //      return 1;
     //  },
     //
     // discountPrice: function () {
     //      jQuery($.opt.parentClass).each(function (i) {
     //          var row = jQuery(this);
     //          // alert(total_discount);
     //
     //      });
     //
     //      return 1;
     //  },
     buttonDiscount: function () {
         jQuery($.opt.parentClass).each(function (i) {
             var row = jQuery(this);

             row.find($.opt.send_disbutton).on("click",function(){

                 var usersid =  $(this).attr("value");
                 row.find($.opt.discount_button).val(usersid);

                 row.find($.opt.discount_price).val(0);
                 if (usersid != "0") {
                     row.find($.opt.discount_price).click();
                 }
           });
         });
         return 1;
     },

     discountPrice: function () {
          jQuery($.opt.parentClass).each(function (i) {
              var row = jQuery(this);

              if (row.find($.opt.discount_button).val() == "1") {
                  var total_discount = Number(row.find($.opt.price_main).val()) - Number(row.find($.opt.discount_price).val());
                  total_discount = self.roundNumber(total_discount, 2);
                  if (Number(row.find($.opt.discount_price).val())!=0) {
                      text_dis = " " + Number(row.find($.opt.discount_price).val()) + " ฿";
                      row.find($.opt.span_dis).html(text_dis);
                  }
                  else {
                      text_dis = "";
                      row.find($.opt.span_dis).html(text_dis);
                  }

                  row.find($.opt.price).val(total_discount);
              }
              else if (row.find($.opt.discount_button).val() == "2") {
                  var percent_discount = Number(row.find($.opt.price_main).val()) * Number(row.find($.opt.discount_price).val())/100;
                  var total_discount = Number(row.find($.opt.price_main).val()) - percent_discount;
                  total_discount = self.roundNumber(total_discount, 2);
                  if (Number(row.find($.opt.discount_price).val())!=0) {
                      text_dis = " " + Number(row.find($.opt.discount_price).val()) + " %";
                      row.find($.opt.span_dis).html(text_dis);
                  }
                  else {
                      text_dis = "";
                      row.find($.opt.span_dis).html(text_dis);
                  }
                  row.find($.opt.price).val(total_discount);
              }
              else {
                  var total_discount = Number(row.find($.opt.price_main).val());
                  total_discount = self.roundNumber(total_discount, 2);
                  text_dis = "";
                  row.find($.opt.span_dis).html(text_dis);
                  row.find($.opt.price).val(total_discount);
              }



              // alert(total_discount);
          });

          return 1;
      },

    calcTotal: function () {
         jQuery($.opt.parentClass).each(function (i) {
             var row = jQuery(this);
             var item_sub_price = row.find($.opt.price).val() * row.find($.opt.qty).val();

             // Uncomment when you want to use
             // var percent_discount = (item_sub_price * row.find($.opt.perdiscount).val())/100;
             //var total = item_sub_price - percent_discount;

             var total = row.find($.opt.price).val() * row.find($.opt.qty).val();
             total = self.roundNumber(total, 2);
             row.find($.opt.total).html(total);
         });

         return 1;
     },

    /***
     * Calculate total quantity of an order.
     *
     * @returns {number}
     */
    calcTotalQty: function () {
         var totalQty = 0;
         jQuery($.opt.qty).each(function (i) {
             var qty = jQuery(this).val();
             if (!isNaN(qty)) totalQty += Number(qty);
         });

         totalQty = self.roundNumber(totalQty, 2);

         jQuery($.opt.totalQty).html(totalQty);

         return 1;
     },

    /***
     * Calculate subtotal of an order.
     *
     * @returns {number}
     */
    calcSubtotal: function () {
         var subtotal = 0;
         jQuery($.opt.total).each(function (i) {
             var total = jQuery(this).html();
             if (!isNaN(total)) subtotal += Number(total);
         });

         subtotal = self.roundNumber(subtotal, 2);

         jQuery($.opt.subtotal).html(subtotal);

         return 1;
     },

    /**
     * Calculate grand total of an order.
     *
     * @returns {number}
     */
    calcGrandTotal: function () {
        var grandTotal = Number(jQuery($.opt.subtotal).html())
                       + Number(jQuery($.opt.shipping).val())
                       - Number(jQuery($.opt.discount).val());
        grandTotal = self.roundNumber(grandTotal, 2);

        jQuery($.opt.grandTotal).html(grandTotal);
        return 1;
    },

//    calcPaidAmount: function () {
//        var grandTotal = Number(jQuery($.opt.subtotal).html())
//                       + Number(jQuery($.opt.shipping).val())
//                       - Number(jQuery($.opt.discount).val());
//        grandTotal = self.roundNumber(grandTotal, 2);
//        jQuery($.opt.paidAmount).val(grandTotal);
//        return 1;
//    },

    calcRemainingAmount: function () {
        var remainingAmount = Number(jQuery($.opt.grandTotal).html())
                       - Number(jQuery($.opt.paidAmount).val());
        jQuery($.opt.remainingAmount).html(remainingAmount);
        return 1;
    },

    calcReturnedAmount: function () {
        var returnedAmount = Number(jQuery($.opt.cashPayment).val())
            - Number(jQuery($.opt.grandTotal).html());
        jQuery($.opt.returnedCash).html(returnedAmount);
        if (returnedAmount < 0) {
            jQuery($.opt.checkReturnedCash).html(1);
        }
        else {
            jQuery($.opt.checkReturnedCash).html(0);

        }
        return 1;
    },

    /**
     * Add a row.
     *
     * @returns {number}
     */
    newRow: function () {
        // Uncomment after re using that
        // var percent_discount = '<td><select class="form-control perdiscount" id="sel1"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select></td>';

        var item_list = '<datalist id="all-items">';
        $.get('/sales/product/items/details/', function (data, status) {
            $.each(data.products, function(key, result){
                item_list += '<option data-value="' + result.id + '" data-price="' + result.consumer_price + '" data-stock= "' + result.stock +'" value="' + result.name + '">' + result.name + '</option>'
            });
            item_list += '</datalist>';

            // Uncomment after re using that
            // jQuery(".c_item_row:last").after('<tr class="c_item_row"><td id="item-name" class="item-name"><div class="delete-btn"><input type="text" class="form-control invoice-item" id="invoice-item" name="all-items" list="all-items" placeholder="Select Item" type="text">'+ item_list +'<a class=' + $.opt.delete.substring(1) + ' href="javascript:;" title="Remove row">X</a></div></td><td><input class="form-control price" placeholder="Price" type="text"> </td><td><input class="form-control qty" placeholder="Quantity" value="1" type="text"></td>'+ percent_discount +'<td><span class="total">0.00</span></td></tr>');

            jQuery(".c_item_row:last").after('<tr class="c_item_row"><td id="item-name" class="item-name"><div class="delete-btn"><input type="text" class="form-control invoice-item" id="invoice-item" name="all-items" list="all-items" placeholder="Select Item" type="text">'+ item_list +'<a class=' + $.opt.delete.substring(1) + ' href="javascript:;" title="Remove row">X</a></div></td><td class="stock">0</td><td><input class="form-control price" placeholder="Price" type="text"> </td><td><input class="form-control qty" placeholder="Quantity" value="1" type="text"></td><td><span class="total">0.00</span></td></tr>');
            if (jQuery($.opt.delete).length > 0) {
                jQuery($.opt.delete).show();
            }
        });
        return 1;
    },

    /**
     * Delete a row.
     *
     * @param elem   current element
     * @returns {number}
     */
    deleteRow: function (elem) {
        jQuery(elem).parents($.opt.parentClass).remove();

        if (jQuery($.opt.delete).length < 1) {
            jQuery($.opt.delete).hide();
        }

        return 1;
    },

    /**
     * minus quantity.
     *
     * @param elem   current element
     * @returns {number}
     */
     minusRow: function (elem) {
         var prev_val = parseInt(jQuery(elem).siblings($.opt.qty).val());
         if (prev_val<=1) {
             return 1;
         }
         jQuery(elem).siblings($.opt.qty).val(prev_val-1);

          return 1;
      },

      /**
       * plus quantity.
       *
       * @param elem   current element
       * @returns {number}
       */
       plusRow: function (elem) {
           var prev_val = parseInt(jQuery(elem).siblings($.opt.qty).val());
           jQuery(elem).siblings($.opt.qty).val(prev_val+1.0);

            return 1;
        },

    /**
     * Round a number.
     * Using: http://www.mediacollege.com/internet/javascript/number/round.html
     *
     * @param number
     * @param decimals
     * @returns {*}
     */
    roundNumber: function (number, decimals) {
        var newString;// The new rounded number
        decimals = Number(decimals);

        if (decimals < 1) {
            newString = (Math.round(number)).toString();
        } else {
            var numString = number.toString();

            if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
                numString += ".";// give it one at the end
            }

            var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
            var d1 = Number(numString.substring(cutoff, cutoff + 1));// The value of the last decimal place that we'll end up with
            var d2 = Number(numString.substring(cutoff + 1, cutoff + 2));// The next decimal, after the last one we want

            if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
                if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
                    while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
                        if (d1 != ".") {
                            cutoff -= 1;
                            d1 = Number(numString.substring(cutoff, cutoff + 1));
                        } else {
                            cutoff -= 1;
                        }
                    }
                }

                d1 += 1;
            }

            if (d1 == 10) {
                numString = numString.substring(0, numString.lastIndexOf("."));
                var roundedNum = Number(numString) + 1;
                newString = roundedNum.toString() + '.';
            } else {
                newString = numString.substring(0, cutoff) + d1.toString();
            }
        }

        if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
            newString += ".";
        }

        var decs = (newString.substring(newString.lastIndexOf(".") + 1)).length;

        for (var i = 0; i < decimals - decs; i++)
            newString += "0";
        //var newNumber = Number(newString);// make it a number if you like

        return newString; // Output the result to the form field (change for your purposes)
    }
};

/**
 *  Publicly accessible defaults.
 */
jQuery.fn.invoice.defaults = {
    addRow: "#addRow",
    price_main : "#i_price_main",
    discount_price : "#i_discount_price",
    discount_button : "#i_discount_button",
    send_disbutton : ".c_send_disbutton",
    span_dis : ".c_span_dis",
    pudith_minus : "#pudith_minus",
    pudith_plus : "#pudith_plus",
    delete: ".delete",
    parentClass: ".c_item_row",

    price: ".c_invoice_price",
    qty: ".c_invoice_qty",
    total: ".c_invoice_total",
    totalQty: "#i_invoice_totalQty",
    // perdiscount: '.perdiscount',

    subtotal: "#i_invoice_subtotal",
    discount: "#i_invoice_discount",
    shipping: "#i_invoice_shipping",
    grandTotal: "#i_invoice_grandTotal",

    remainingAmount: '#i_invoice_remainingAmount',
    paidAmount: '#i_invoice_paidAmount',

    cashPayment: '#i_invoice_cash_payment',
    returnedCash: '#i_invoice_returned_cash',
    checkReturnedCash : '#i_check_returned_cash'
};
