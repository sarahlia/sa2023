import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import {
  accounts,
  customers,
  orderItems,
  orders,
  products
} from '../../data/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columnDefs: ColDef[] = [
    {
      headerName: 'Customer Name',
      field: 'customer.name',
      filter: true
    },
    {
      headerName: 'Account No',
      field: 'accountNumber',
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Date of Order',
      field: 'dateOfOrder',
      filter: 'agDateColumnFilter'
    },
    {
      headerName: 'Total',
      field: 'total',
      filter: 'agNumberColumnFilter'
    }
  ];

  /**
   * Import orders from /data/data.json file and join with account and customer data.
   * dateOfOrder is a Date object with a hard coded time
   */
  rowData: Array<{ [key: string]: string | number | object }> = orders.map(
    (order) => ({
      ...order,
      // create Date object value for dateOfOrder field
      dateOfOrder: new Date(`${order.dateOfOrder.slice(0, 10)}T00:00:00.0`),
      account: accounts.find((account) => account.id === order.accountId),
      accountNumber: parseInt(
        accounts.find((account) => account.id === order.accountId).accountNumber
      ),
      customer: customers.find((customer) => customer.id === order.customerId),
      orderItems: orderItems.filter((item) => item.orderId === order.id),
      total: orderItems
        .filter((item) => item.orderId === order.id)
        .map((item) =>
          products.find((product) => product.id === item.productId)
        )
        .reduce((prev, current) => prev + Number(current.price), 0)
    })
  );
}
