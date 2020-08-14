import * as React from 'react'
import { cloneElement, useMemo } from 'react'

import {
  useNotify,
  useRefresh,
  useRedirect,
  List,
  Create,
  ArrayField,
  FunctionField,
  Edit,
  SimpleForm,
  NumberInput,
  DisabledInput,
  BooleanInput,
  BooleanField,
  ChipField,
  ImageInput,
  TextInput,
  DateInput,
  ArrayInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  SimpleFormIterator,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  RichTextField,
  ShowButton,
  TopToolbar,
  Button,
  ImageField,
  DeleteButton,
  ListButton,
  CreateButton,
  ExportButton,
  useListContext,
  sanitizeListRestProps,
  AutocompleteInput,
  NumberField,
  Toolbar,
  ReferenceField,
  Filter,
  SaveButton
} from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'

export const ProductList = ({ permissions, ...props }) => (
  <List
    filters={<ProductFilter />}
    {...props}
    sort={{ field: 'date', order: 'DESC' }}
    bulkActionButtons={false}
    actions={<ListActions />}
  >
    <Datagrid actions={<ListActions />} rowClick='show'>
      <TextField label='Product' source='name' />
      <ChipField label='Category' source='category' />
      <NumberField
        label='Price'
        source='price'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <BooleanField label='Is Draft' source='draft' />
      <DateField label='Created' source='date' />
      <ShowButton basePath={props.basePath} record={props.data} />
      {permissions === 'owner' && <DeleteButton />}
    </Datagrid>
  </List>
)

const ListActions = props => {
  const { className, exporter, filters, maxResults, ...rest } = props
  const {
    basePath,
    resource,
    showFilter,
    displayedFilters,
    filterValues
  } = useListContext()
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        React.cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button'
        })}
      <CreateButton basePath={basePath} />
    </TopToolbar>
  )
}

const ProductFilter = props => {
  return (
    <Filter {...props}>
      <BooleanInput source='deleted' label='Show Deleted' />
    </Filter>
  )
}

export const ProductShow = props => {
  return (
    <Show actions={<ProductShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField label='Database ID' source='id' />
        <TextField label='Product Name' source='name' />
        <TextField label='Category' source='category' />
        <TextField label='Description' source='description' />
        <TextField label='Price' source='price' />
        <ArrayField label='Price Tiers' source='priceTiers'>
          <Datagrid>
            <TextField label='ID' source='id' />
            <TextField label='Quantity' source='quantity' />
            <NumberField
              label='Price per unit'
              options={{ style: 'currency', currency: 'USD' }}
              source='price'
            />
          </Datagrid>
        </ArrayField>
        <FunctionField
          label='CBD Contents'
          render={record =>
            `${record.metaData.cbd.quantity} ${record.metaData.cbd.unit}`
          }
        />
        <FunctionField
          label='THC Contents'
          render={record =>
            `${record.metaData.thc.quantity} ${record.metaData.thc.unit}`
          }
        />
        <FunctionField
          label='Product Contents'
          render={record =>
            `${record.metaData.units.quantity} ${record.metaData.units.unit}`
          }
        />
        <FunctionField
          label='Shipping Weight'
          render={record =>
            `${record.metaData.weight.quantity} ${record.metaData.weight.unit}`
          }
        />

        <ArrayField label='Images' source='imageData'>
          <Datagrid>
            <ImageField source='url' title='key' />
            <TextField label='url' source='url' />
          </Datagrid>
        </ArrayField>
        <DateField label='Publish Date' source='date' />
        <ReferenceManyField
          label='Reviews Written for this product'
          source='id'
          reference='admin-reviews'
          target='user'
          link='show'
        >
          <Datagrid rowClick='show'>
            <ReferenceField
              link='show'
              label='User'
              reference='admin-users'
              source='user'
            >
              <TextField source='name' />
            </ReferenceField>
            <TextField label='Stars' source='stars' />
            <DateField label='Date' source='date' />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  )
}

const productCategories = [
  { id: 'flower', name: 'Flower' },
  { id: 'edibles', name: 'Edibles' },
  { id: 'concentrates', name: 'Concentrates' },
  { id: 'topicals', name: 'Topicals' },
  { id: 'pet_products', name: 'Pet Products' },
  { id: 'accessories', name: 'Accessories' }
]

const dropZoneOptions = {
  maxFiles: 1
  // accept: function(file, done) {
  //   alert("uploaded");
  //   done();
  // },
  // init: function() {
  //   this.on("maxfilesexceeded", function(file){
  //     alert("max reached");

  //   })
  // }
}

export const ProductCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <AutocompleteInput
          lablel='Category'
          source='category'
          choices={productCategories}
        />
        <TextInput label='Product Name' source='name' />
        <TextInput
          options={{ multiLine: true }}
          label='Description'
          source='description'
        />
        <NumberInput
          label='Base Price Per Unit'
          source='price'
          min='0'
          max='5000'
        />
        <ArrayInput label='Price Tiers' source='priceTiers'>
          <SimpleFormIterator>
            <NumberInput label='Quantity' source='quantity' />
            <NumberInput
              label='Price per unit (USD)'
              source='price'
              min='0'
              max='5000'
            />
          </SimpleFormIterator>
        </ArrayInput>
        <div className='product_create_metaData'>
          <div className='product_create_cbd'>
            <h2>CBD Contents</h2>

            <NumberInput
              label='Quantity (number)'
              source='metaData.cbd.quantity'
            />
            <TextInput
              label='Unit (%, mg, etc...)'
              source='metaData.cbd.unit'
            />
          </div>
          <div className='product_create_thc'>
            <h2>THC Contents</h2>
            <NumberInput
              label='Quantity (number)'
              source='metaData.thc.quantity'
            />
            <TextInput
              label='Unit (%, mg, etc...)'
              source='metaData.thc.unit'
            />
          </div>
          <div className='product_create_cbd'>
            <h2>Single Unit Contents</h2>
            <NumberInput
              label='Quantity (number)'
              source='metaData.units.quantity'
            />
            <TextInput
              label='Unit (mL, lbs, etc...)'
              source='metaData.units.unit'
            />
          </div>
          <div className='product_create_cbd'>
            <h2>Product Weight</h2>
            <p>used to calculate shipping costs</p>
            <NumberInput
              label='Weight (number)'
              source='metaData.weight.quantity'
            />
            <TextInput
              label='Unit (lbs, oz, etc...)'
              source='metaData.weight.unit'
            />
          </div>
        </div>
        <ImageInput
          source='imageData'
          label='Product Images'
          accept='image/*'
          multiple='true'
          options={dropZoneOptions}
        >
          <ImageField source='url' title='title' />
        </ImageInput>
        <p>
          Please upload 1-4 product images. The first one uploaded will be the
          primary image.
        </p>
        <BooleanInput
          label='Draft (drafts are not displayed to users)'
          source='draft'
          initialValue={true}
        />
      </SimpleForm>
    </Create>
  )
}

export const ProductEdit = props => {
  return (
    <Edit
      undoable={false}
      title={<ProductTitle />}
      actions={<ProductEditActions />}
      {...props}
    >
      <SimpleForm toolbar={<ProductEditToolbar />}>
        <TextInput disabled label='ID' source='id' />
        <BooleanInput
          label='Draft (drafts are not displayed to users)'
          source='draft'
        />
        <AutocompleteInput
          label='Category'
          source='category'
          choices={productCategories}
        />
        <TextInput label='Product Name' source='name' />
        <TextInput multiline label='Description' source='description' />
        <NumberInput
          label='Base Price Per Unit'
          source='price'
          min='0'
          max='5000'
        />
        <ArrayInput label='Price Tiers' source='priceTiers'>
          <SimpleFormIterator>
            <NumberInput label='Quantity' source='quantity' />
            <NumberInput
              label='Price per unit (USD)'
              source='price'
              min='0'
              max='5000'
            />
          </SimpleFormIterator>
        </ArrayInput>
        <div className='product_create_metaData'>
          <div className='product_create_cbd'>
            <h2>CBD Contents</h2>

            <NumberInput
              label='Quantity (number)'
              source='metaData.cbd.quantity'
            />
            <TextInput
              label='Unit (%, mg, etc...)'
              source='metaData.cbd.unit'
            />
          </div>
          <div className='product_create_thc'>
            <h2>THC Contents</h2>
            <NumberInput
              label='Quantity (number)'
              source='metaData.thc.quantity'
            />
            <TextInput
              label='Unit (%, mg, etc...)'
              source='metaData.thc.unit'
            />
          </div>
          <div className='product_create_cbd'>
            <h2>Single Unit Contents</h2>
            <NumberInput
              label='Quantity (number)'
              source='metaData.units.quantity'
            />
            <TextInput
              label='Unit (mL, lbs, etc...)'
              source='metaData.units.unit'
            />
          </div>
          <div className='product_create_cbd'>
            <h2>Product Weight</h2>
            <p>used to calculate shipping costs</p>
            <NumberInput
              label='Weight (number)'
              source='metaData.weight.quantity'
            />
            <TextInput
              label='Unit (lbs, oz, etc...)'
              source='metaData.weight.unit'
            />
          </div>
        </div>
        <ImageInput
          source='imageData'
          label='Product Images'
          accept='image/*'
          multiple='true'
        >
          <ImageField source='url' title='title' />
        </ImageInput>
      </SimpleForm>
    </Edit>
  )
}

// custom components
const ProductTitle = ({ record }) => {
  return <span>Edit Product: {record ? `"${record.name}"` : ''}</span>
}

const ProductShowActions = ({ permissions, basePath, data, resource }) => (
  <TopToolbar>
    <EditButton label='Edit' basePath={basePath} record={data} />
    {permissions === 'owner' && (
      <DeleteButton basePath={basePath} record={data} />
    )}
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)

const ProductEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)

const ProductEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
)
