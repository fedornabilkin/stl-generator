<template>
  <div>
    <div class="field has-text-centered">{{$t('optionalFieldsHint')}}</div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('yourName')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('firstname')" v-model="contact.firstName" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('lastname')" v-model="contact.lastName" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('organization')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('organizationPlaceHolder')" v-model="contact.organization" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('role')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input
              class="input"
              type="text"
              :placeholder="$t('rolePlaceHolder')"
              v-model="contact.role"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('numbers')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('cellphone')" v-model="contact.cell" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label for class="label"></label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('phone')" v-model="contact.phone" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('faxPlaceHolder')" v-model="contact.fax" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">E-Mail:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('emailPlaceHolder')" v-model="contact.email" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('street')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('streetPlaceHolder')" v-model="contact.street" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('city')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('postcodePlaceHolder')" v-model="contact.postcode" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('cityPlaceHolder')" v-model="contact.city" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{$t('state')}}:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('statePlaceHolder')" v-model="contact.state" />
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('countryPlaceHolder')" v-model="contact.country" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Website:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('sitePlaceHolder')" v-model="contact.website" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    contact: Object,
  },
};
</script>

<style>
</style>
