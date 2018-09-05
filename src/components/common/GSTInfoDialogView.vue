<template>
  <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="GSTInfoDialog" lazy absolute class="pb10">
      <v-card>
        <v-card-title>
          <div class="">About GST</div>
        </v-card-title>
        <v-card-text class="f14">
          You can claim (If applicable) input credit by providing your GST details.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="txt_blue font-bold darken-1" flat="flat" @click.native="closeGSTInfoDialog">GOT IT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    props: ['GSTInfoDialog'],
    methods: {
      closeGSTInfoDialog () {
        this.$emit('GSTInfoDialogClose', false)
      }
    }
  }
</script>
<style>
    .dialog__content.dialog__content__active{
        background: rgba(0,0,0,0.38)
    }
  .card__title{
      padding: 16px 16px 0; font-size: 22px !important;
  }
  .card__text{
     padding: 16px 16px 0;
  }
    .f14{font-size:14px;}
    .pb{padding:10px;}
    .txt_blue{
        color:rgb(30, 136, 229)
    }
</style>
