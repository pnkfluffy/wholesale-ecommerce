import * as React from 'react'
import { cloneElement, useMemo } from 'react';

import {
  List, Create,
  Edit, SimpleForm, NumberInput,
  DisabledInput, BooleanInput, ImageInput,
  TextInput, DateInput, ArrayInput,
  LongTextInput, ReferenceManyField,
  Datagrid, TextField, SimpleFormIterator,
  DateField, EditButton,
  Show, SimpleShowLayout,
  RichTextField, ShowButton,
  TopToolbar, Button, ImageField,
  DeleteButton, ListButton,
  CreateButton, ExportButton, useListContext, sanitizeListRestProps,
} from 'react-admin'
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles({
//   CreateForm: {
//       display: 'flex',
//       flexWrap: 'wrap'
//   },
// });
// const classes = useStyles()

export const ProductShow = (props) => (
  <Show actions={< ProductShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField label="Product Name" source="name"/>
        <TextField label="Category" source="category" />
        <TextField label="Description" source="description" />
        <TextField label="Price" source="price" />
        <DateField label="Release date" source="date"/>
        <TextField label="Database ID" source="id" />
        {/* <ImageField source="imageData" /> */}
      </SimpleShowLayout>
  </Show>
);

export const ProductList = props => (
<List {...props}>
<Datagrid actions={< ListActions />}rowClick='show'>
      {/* <TextField label='ID' source='id' /> */}
      <TextField label='Name' source='name' />
      <TextField label="Category" source="category"/>
      <TextField label="Price" source="price"/>
      < ShowButton basePath={props.basePath} record={props.data}/>
      < DeleteButton />
    </Datagrid>
  </List>
)

export const ProductCreate = (props) => (
  <Create {...props}>
      <SimpleForm >
          <TextInput label="Product Name" source="name" />
          <TextInput label="Category" source="category"/>
          <TextInput label="Description" source="description" options={{ multiLine: true }} />
          <NumberInput label="Price" source="price"/>
          <ArrayInput label="Price Tiers" source="priceTiers.tiers">
            <SimpleFormIterator>
              <NumberInput label="Quantity" source="priceTiers.tiers.price"/>
              <NumberInput label="Discount applied" source="priceTiers.tiers.ratio"/>
            </SimpleFormIterator>
          </ArrayInput>
          {/* <ImageInput source="imageData"/> */}
      </SimpleForm>
  </Create>
);

export const ProductEdit = props => (
  <Edit actions={<ProductEditActions />} title={<ProductTitle />} {...props}>
    <SimpleForm>
      {/* {!} NEEDS TO BE DONE LATER TO EDIT ORDERS OF USERS */}
      {/* <ReferenceInput source="orderId" reference="orders"> */}
      <TextInput label="Product Name" source="name" />
      <TextInput label="Category" source="category"/>
      <TextInput label="Description" source="description"  />
      <NumberInput label="Price" source="price"/>
      {/* <ImageInput source="imageData"/> */}
    </SimpleForm>
  </Edit>
)

// custom components
const ProductTitle = ({ record }) => {
  return <span>Post {record ? `"${record.name}"` : ''}</span>
}

const ProductShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton label="Edit" basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    < ListButton basePath={basePath} record={data} />
      {/* Add your custom actions */}
  </TopToolbar>
);
const ProductEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    < ListButton basePath={basePath} record={data} />
      {/* Add your custom actions */}
  </TopToolbar>
);
const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const { currentSort, resource, displayedFilters, filterValues, hasCreate, basePath, selectedIds, showFilter,
      total,
  } = useListContext();
  return (
      <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
          {filters && cloneElement(filters, {
              resource,
              showFilter,
              displayedFilters,
              filterValues,
              context: 'button',
          })}
          <DeleteButton basePath={basePath} />
          <CreateButton basePath={basePath} />
          <ExportButton
              disabled={total === 0}
              resource={resource}
              sort={currentSort}
              filterValues={filterValues}
              maxResults={maxResults}
          />
          {/* Add your custom actions */}
          <Button
              onClick={() => { alert('Your custom action'); }}
              label="Show calendar"
          >
          </Button>
      </TopToolbar>
  );
};

