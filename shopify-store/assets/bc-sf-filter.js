// Override Settings
var bcSfFilterSettings = {
  general: {
    limit: bcSfFilterConfig.custom.products_per_page,
    /* Optional */
    loadProductFirst: true,
    numberFilterTree: 2
  }
};

// Declare Templates
var bcSfFilterTemplate = {
  soldOutClass: "product--sold-out",
  soldOutLabelHtml:
    '<div class="product__label label soldout"><p class="product__label-text label__text">' +
    bcSfFilterConfig.label.sold_out +
    "</p></div>",
  saleLabelHtml:
    '<div class="product__label label sale"><p class="product__label-text label__text">' +
    bcSfFilterConfig.label.on_sale +
    "</p></div>",
  vendorHtml: '<h4 class="product__vendor h6">{{itemVendorLabel}}</h4>',

  // Grid Template
  productGridItemHtml:
    '<div class="o-layout__item ' +
    bcSfFilterConfig.custom.grid_item_width +
    '">' +
    '<a href="{{itemUrl}}" class="product-link" title="{{itemTitle}}">' +
    '<div class="product {{soldOutClass}} product--' +
    bcSfFilterConfig.custom.product_grid_align +
    " " +
    bcSfFilterConfig.general.product_card_shadow +
    '">' +
    '<div class="product__media u-bg-' +
    bcSfFilterConfig.custom.product_grid_bg +
    '">' +
    '<div class="product__img-wrapper">' +
    '<img src="{{itemThumbUrl}}" data-src="{{itemThumbSrc}}" alt="{{itemTitle}}" class="product__img lazyload">' +
    "{{itemFlipImage}}" +
    "</div>" +
    "{{itemLabels}}" +
    "</div>" +
    '<div class="product__details ' +
    bcSfFilterConfig.general.product_card_padding +
    '">' +
    '<h3 class="product__title h4">{{itemTitle}}</h3>' +
    "{{itemVendor}}" +
    '<p class="product__price h5">{{itemPrice}}</p>' +
    "</div>" +
    "</div>" +
    "</a>" +
    "</div>",

  // Pagination Template
  previousHtml:
    '<span class="prev"><a href="{{itemUrl}}" title="Previous"><i class="icon icon--left-t"></i></a></span>',
  nextHtml:
    '<span class="next"><a href="{{itemUrl}}" title="Next"><i class="icon icon--right-t"></i></a></span>',
  pageItemHtml:
    '<span class="page"><a href="{{itemUrl}}" title="">{{itemTitle}}</a></span>',
  pageItemSelectedHtml: '<span class="page current">{{itemTitle}}</span>',
  pageItemRemainHtml: '<span class="deco">{{itemTitle}}</span>',
  paginateHtml: "{{previous}}{{pageItems}}{{next}}",

  // Sorting Template
  sortingHtml:
    "<label>" +
    bcSfFilterConfig.label.sorting +
    "</label><select>{{sortingItems}}</select>"
};

/************************** BUILD PRODUCT LIST **************************/

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function(data) {
  /*** Prepare data ***/
  var images = data.images_info;
  // Displaying price base on the policy of Shopify, have to multiple by 100
  var soldOut = !data.available; // Check a product is out of stock
  var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
  var priceVaries = data.price_min != data.price_max; // Check a product has many prices
  // Get First Variant (selected_or_first_available_variant)
  var firstVariant = data["variants"][0];
  if (getParam("variant") !== null && getParam("variant") != "") {
    var paramVariant = data.variants.filter(function(e) {
      return e.id == getParam("variant");
    });
    if (typeof paramVariant[0] !== "undefined") firstVariant = paramVariant[0];
  } else {
    for (var i = 0; i < data["variants"].length; i++) {
      if (data["variants"][i].available) {
        firstVariant = data["variants"][i];
        break;
      }
    }
  }
  /*** End Prepare data ***/

  // Get Template
  var itemHtml = bcSfFilterTemplate.productGridItemHtml;

  // Add Thumbnail
  var itemThumbUrl =
    images.length > 0
      ? this.optimizeImage(images[0]["src"], "100x")
      : bcSfFilterConfig.general.no_image_url;
  var itemThumbSrc = this.getFeaturedImage(
    images,
    bcSfFilterConfig.custom.image_size
  );
  itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);
  itemHtml = itemHtml.replace(/{{itemThumbSrc}}/g, itemThumbSrc);

  var itemFlipImage = "";
  if (bcSfFilterConfig.custom.product_grid_second_hover && images.length > 1) {
    itemFlipImage =
      '<div class="product__img-hover u-bg-' +
      bcSfFilterConfig.custom.product_grid_bg +
      ' lazyload js"' +
      'data-parent-fit="cover"' +
      'style="background-image: url(' +
      this.optimizeImage(images[1]["src"], "300x") +
      ');"></div>' +
      "<noscript>" +
      '<div class="product__img-hover u-bg-' +
      bcSfFilterConfig.custom.product_grid_bg +
      '" style="background-image: url(' +
      this.optimizeImage(images[1]["src"], "300x") +
      ');">' +
      "</div>" +
      "</noscript>";
  }
  itemHtml = itemHtml.replace(/{{itemFlipImage}}/g, itemFlipImage);

  // Add Price
  var itemPriceHtml = "";
  if (!soldOut) {
    if (onSale) {
      if (priceVaries) {
        itemPriceHtml +=
          '<span class="product__price-price"><span class="money">' +
          this.formatMoney(data.price_min) +
          "</span></span>";
        itemPriceHtml +=
          '<strike class="product__price-cross"><span class="money">' +
          this.formatMoney(data.compare_at_price_min) +
          "</span></strike>";
      } else {
        itemPriceHtml +=
          '<span class="product__price-price"><span class="money">' +
          this.formatMoney(data.price_min) +
          "</span></span>";
        itemPriceHtml +=
          '<strike class="product__price-cross"><span class="money">' +
          this.formatMoney(data.compare_at_price_min) +
          "</span></strike>";
      }
    } else {
      itemPriceHtml +=
        '<span class="product__price-price"><span class="money">' +
        this.formatMoney(data.price_min) +
        "</span></span>";
    }
  } else {
    itemPriceHtml +=
      '<span class="product__price-price product__price-price--sold">' +
      bcSfFilterConfig.label.sold_out +
      "</span>";
  }
  itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

  // Add soldOut class
  var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : "";
  itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);

  // Add labelHtml
  var itemLabelsHtml = "";
  // Add onSale Label
  var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : "";
  itemLabelsHtml += itemSaleLabelHtml;
  // Add soldOut Label
  var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : "";
  itemLabelsHtml += itemSoldOutLabelHtml;
  itemHtml = itemHtml.replace(/{{itemLabels}}/g, itemLabelsHtml);

  // Add Vendor
  var itemVendorHtml = bcSfFilterConfig.custom.product_grid_vendor
    ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor)
    : "";
  itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

  // Add main attribute (Always put at the end of this function)
  itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
  itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
  itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
  itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

  return itemHtml;
};

/************************** END BUILD PRODUCT LIST **************************/

BCSfFilter.prototype.buildPagination = function(totalProduct) {
  // Get page info
  var currentPage = parseInt(this.queryParams.page);
  var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

  // If it has only one page, clear Pagination
  if (totalPage == 1) {
    jQ(this.selector.pagination).html("");
    return false;
  }

  if (this.getSettingValue("general.paginationType") == "default") {
    var paginationHtml = bcSfFilterTemplate.paginateHtml;

    // Build Previous
    var previousHtml = currentPage > 1 ? bcSfFilterTemplate.previousHtml : "";
    previousHtml = previousHtml.replace(
      /{{itemUrl}}/g,
      this.buildToolbarLink("page", currentPage, currentPage - 1)
    );
    paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

    // Build Next
    var nextHtml = currentPage < totalPage ? bcSfFilterTemplate.nextHtml : "";
    nextHtml = nextHtml.replace(
      /{{itemUrl}}/g,
      this.buildToolbarLink("page", currentPage, currentPage + 1)
    );
    paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

    // Create page items array
    var beforeCurrentPageArr = [];
    for (
      var iBefore = currentPage - 1;
      iBefore > currentPage - 3 && iBefore > 0;
      iBefore--
    ) {
      beforeCurrentPageArr.unshift(iBefore);
    }
    if (currentPage - 4 > 0) {
      beforeCurrentPageArr.unshift("...");
    }
    if (currentPage - 4 >= 0) {
      beforeCurrentPageArr.unshift(1);
    }
    beforeCurrentPageArr.push(currentPage);

    var afterCurrentPageArr = [];
    for (
      var iAfter = currentPage + 1;
      iAfter < currentPage + 3 && iAfter <= totalPage;
      iAfter++
    ) {
      afterCurrentPageArr.push(iAfter);
    }
    if (currentPage + 3 < totalPage) {
      afterCurrentPageArr.push("...");
    }
    if (currentPage + 3 <= totalPage) {
      afterCurrentPageArr.push(totalPage);
    }

    // Build page items
    var pageItemsHtml = "";
    var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
    for (var iPage = 0; iPage < pageArr.length; iPage++) {
      if (pageArr[iPage] == "...") {
        pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
      } else {
        pageItemsHtml +=
          pageArr[iPage] == currentPage
            ? bcSfFilterTemplate.pageItemSelectedHtml
            : bcSfFilterTemplate.pageItemHtml;
      }
      pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
      pageItemsHtml = pageItemsHtml.replace(
        /{{itemUrl}}/g,
        this.buildToolbarLink("page", currentPage, pageArr[iPage])
      );
    }
    paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

    jQ(this.selector.pagination).html(paginationHtml);
  }
};

/************************** BUILD TOOLBAR **************************/

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function() {
  if (bcSfFilterTemplate.hasOwnProperty("sortingHtml")) {
    jQ(this.selector.topSorting).html("");

    var sortingArr = this.getSortingList();
    if (sortingArr) {
      // Build content
      var sortingItemsHtml = "";
      for (var k in sortingArr) {
        sortingItemsHtml +=
          '<option value="' + k + '">' + sortingArr[k] + "</option>";
      }
      var html = bcSfFilterTemplate.sortingHtml.replace(
        /{{sortingItems}}/g,
        sortingItemsHtml
      );
      jQ(this.selector.topSorting).html(html);

      // Set current value
      jQ(this.selector.topSorting + " select").val(this.queryParams.sort);
    }
  }
};

// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function(data, eventType) {};

// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function(data) {
  if (bcSfFilterConfig.custom.product_grid_masonry) {
    var $collection_grid = $(".o-layout--masonry");
    $collection_grid.imagesLoaded(function() {
      $collection_grid.masonry("reloadItems");
      $collection_grid.masonry("layout");
    });
  }
};

// Build Default layout
function buildDefaultLink(a, b) {
  var c = window.location.href.split("?")[0];
  return (c += "?" + a + "=" + b);
}
BCSfFilter.prototype.buildDefaultElements = function(a) {
  if (
    bcSfFilterConfig.general.hasOwnProperty("collection_count") &&
    jQ("#bc-sf-filter-bottom-pagination").length > 0
  ) {
    var b = bcSfFilterConfig.general.collection_count,
      c = parseInt(this.queryParams.page),
      d = Math.ceil(b / this.queryParams.limit);
    if (1 == d) return jQ(this.selector.pagination).html(""), !1;
    if ("default" == this.getSettingValue("general.paginationType")) {
      var e = bcSfFilterTemplate.paginateHtml,
        f = "";
      (f =
        c > 1
          ? bcSfFilterTemplate.hasOwnProperty("previousActiveHtml")
            ? bcSfFilterTemplate.previousActiveHtml
            : bcSfFilterTemplate.previousHtml
          : bcSfFilterTemplate.hasOwnProperty("previousDisabledHtml")
            ? bcSfFilterTemplate.previousDisabledHtml
            : ""),
        (f = f.replace(/{{itemUrl}}/g, buildDefaultLink("page", c - 1))),
        (e = e.replace(/{{previous}}/g, f));
      var g = "";
      (g =
        c < d
          ? bcSfFilterTemplate.hasOwnProperty("nextActiveHtml")
            ? bcSfFilterTemplate.nextActiveHtml
            : bcSfFilterTemplate.nextHtml
          : bcSfFilterTemplate.hasOwnProperty("nextDisabledHtml")
            ? bcSfFilterTemplate.nextDisabledHtml
            : ""),
        (g = g.replace(/{{itemUrl}}/g, buildDefaultLink("page", c + 1))),
        (e = e.replace(/{{next}}/g, g));
      for (var h = [], i = c - 1; i > c - 3 && i > 0; i--) h.unshift(i);
      c - 4 > 0 && h.unshift("..."), c - 4 >= 0 && h.unshift(1), h.push(c);
      for (var j = [], k = c + 1; k < c + 3 && k <= d; k++) j.push(k);
      c + 3 < d && j.push("..."), c + 3 <= d && j.push(d);
      for (var l = "", m = h.concat(j), n = 0; n < m.length; n++)
        "..." == m[n]
          ? (l += bcSfFilterTemplate.pageItemRemainHtml)
          : (l +=
              m[n] == c
                ? bcSfFilterTemplate.pageItemSelectedHtml
                : bcSfFilterTemplate.pageItemHtml),
          (l = l.replace(/{{itemTitle}}/g, m[n])),
          (l = l.replace(/{{itemUrl}}/g, buildDefaultLink("page", m[n])));
      (e = e.replace(/{{pageItems}}/g, l)),
        jQ(this.selector.pagination).html(e);
    }
  }
  if (
    bcSfFilterTemplate.hasOwnProperty("sortingHtml") &&
    jQ(this.selector.topSorting).length > 0
  ) {
    jQ(this.selector.topSorting).html("");
    var o = this.getSortingList();
    if (o) {
      var p = "";
      for (var q in o) p += '<option value="' + q + '">' + o[q] + "</option>";
      var r = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, p);
      jQ(this.selector.topSorting).html(r);
      var s =
        void 0 !== this.queryParams.sort_by
          ? this.queryParams.sort_by
          : this.defaultSorting;
      jQ(this.selector.topSorting + " select").val(s),
        jQ(this.selector.topSorting + " select").change(function(a) {
          window.location.href = buildDefaultLink("sort_by", jQ(this).val());
        });
    }
  }
};

// Customize data to suit the data of Shopify API
BCSfFilter.prototype.prepareProductData = function(data) {
  for (var k = 0; k < data.length; k++) {
    data[k]["images"] = data[k]["images_info"];
    if (data[k]["images"].length > 0) {
      data[k]["featured_image"] = data[k]["images"][0];
    } else {
      data[k]["featured_image"] = {
        src: bcSfFilterConfig.general.no_image_url,
        width: "",
        height: "",
        aspect_ratio: 0
      };
    }
    data[k]["url"] = "/products/" + data[k].handle;
    var optionsArr = [];
    for (var i = 0; i < data[k]["options_with_values"].length; i++) {
      optionsArr.push(data[k]["options_with_values"][i]["name"]);
    }
    data[k]["options"] = optionsArr;
    (data[k]["price_min"] *= 100),
      (data[k]["price_max"] *= 100),
      (data[k]["compare_at_price_min"] *= 100),
      (data[k]["compare_at_price_max"] *= 100);
    data[k]["price"] = data[k]["price_min"];
    data[k]["compare_at_price"] = data[k]["compare_at_price_min"];
    data[k]["price_varies"] = data[k]["price_min"] != data[k]["price_max"];
    var firstVariant = data[k]["variants"][0];
    if (getParam("variant") !== null && getParam("variant") != "") {
      var paramVariant = data.variants.filter(function(e) {
        return e.id == getParam("variant");
      });
      if (typeof paramVariant[0] !== "undefined")
        firstVariant = paramVariant[0];
    } else {
      for (var i = 0; i < data[k]["variants"].length; i++) {
        if (data[k]["variants"][i].available) {
          firstVariant = data[k]["variants"][i];
          break;
        }
      }
    }
    data[k]["selected_or_first_available_variant"] = firstVariant;
    for (var i = 0; i < data[k]["variants"].length; i++) {
      var variantOptionArr = [];
      var count = 1;
      var variant = data[k]["variants"][i];
      var variantOptions = variant["merged_options"];
      if (Array.isArray(variantOptions)) {
        for (var j = 0; j < variantOptions.length; j++) {
          var temp = variantOptions[j].split(":");
          data[k]["variants"][i]["option" + (parseInt(j) + 1)] = temp[1];
          data[k]["variants"][i]["option_" + temp[0]] = temp[1];
          variantOptionArr.push(temp[1]);
        }
        data[k]["variants"][i]["options"] = variantOptionArr;
      }
      data[k]["variants"][i]["compare_at_price"] =
        parseFloat(data[k]["variants"][i]["compare_at_price"]) * 100;
      data[k]["variants"][i]["price"] =
        parseFloat(data[k]["variants"][i]["price"]) * 100;
    }
    data[k]["description"] = data[k]["content"] = data[k]["body_html"];
  }
  return data;
};
