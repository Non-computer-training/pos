'use strict';

function printReceipt(inputs) {
  const validItems = composeValidItems(loadAllItems(), inputs);
  const buildItemsPrint = buildItemsToPrice(validItems);
  const totalPrice = calculateTotalPrice(validItems);
  const printReceipt = receipt(buildItemsPrint, totalPrice);

  console.log(printReceipt);
}

function composeValidItems(items, inputs) {
  const allItems = composeItemsByInputs(items, inputs);
  const composeTwo = [];
  allItems.forEach(function (itemElement) {
    const item = composeTwo.find(function (item) {
      return item.barcode === itemElement.barcode;
    });
    if (item) {
      item.count += 1;
    } else {
      composeTwo.push(Object.assign({}, itemElement, {count: 1}));
    }
  });

  return composeTwo;
}

function composeItemsByInputs(items, inputs) {
  const composeOne = [];
  inputs.forEach(function (input) {
    const item = items.find(function (item) {
      return input === item.barcode;
    });
    if (item) {
      composeOne.push(item);
    }
  });

  return composeOne;
}

function buildItemsToPrice(validItems) {
  const printItems = validItems.map(function (validItem) {
    return '名称：' + validItem.name
      + '，数量：' + validItem.count + validItem.unit
      + '，单价：' + formatPrice(validItem.price)
      + '(元)，小计：' + formatPrice(validItem.count * validItem.price) + '(元)';
  });
  return printItems.join('\n');
}


function calculateTotalPrice(validItems) {
  return validItems.reduce(function (sum, validItem) {
    return sum + validItem.count * validItem.price;
  }, 0);
}

function receipt(buildItemsPrint, totalPrice) {
  const header = '***<没钱赚商店>收据***\n';
  const itemsBody = buildItemsPrint;
  const footer = `\n----------------------\n总计：${formatPrice(totalPrice)}(元)\n**********************`;

  return header + itemsBody + footer;
}

function formatPrice(price) {
  const NUMBER = 2;
  return price.toFixed(NUMBER);
}
