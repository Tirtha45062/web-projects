import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ReportService } from "../service/report.service";
import { ActivatedRoute } from "@angular/router";
// import * as $ from 'jquery';
@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {

  isSubmit=false;
  bu_name:any="";
  budget:any="";
  period:any="";
  message:any="";
  bupopup=false;
  budgetpopup=false;
  periodpopup=false;
  filepopup=false;
  button=true;
  file:any;
  rev_op:number=0;
  cogs:number=0;
  gross_margin:number=0;
  ebitda:number=0;
  ebit:number=0;
  pbt_after:number=0;

buname(v:any){ 
  var data=v.target.value;
  this.bu_name=data;
  if(this.bu_name==""){
    this.bupopup=true;
    this.message="Please Select BU NAME"
  }else{
    this.bupopup=false;
  }
}
budg(v:any){
  var data=v.target.value;
  this.budget=data;
  if(this.budget==""){
    this.budgetpopup=true;
    this.message="Please Select BUDGET or ACTUAL"
  }else{
    this.budgetpopup=false;
  }
}
per(v:any){
  var data=v.target.value;
  this.period=data;
  if(this.period==""){
    this.periodpopup=true;
    this.message="Please Select PERIOD"
  }else{
    this.periodpopup=false;
  }
}
uploadfile(v:any){
  var data=v.target.files[0];
  this.file=data;
  // console.log(this.file);
}

  constructor(
    private fb: FormBuilder,
    private reportservice: ReportService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  exc_items(v:any){
    var data:any=document.getElementById('exc_items')
    var output:any=document.getElementById('exc_items2');
    output.value=data.value;
  }
  // ebitda(v:any){
  //   var data:any=document.getElementById('ebitda')
  //   var output:any=document.getElementById('ebitda2');
  //   output.value=data.value;
  // }
  add1(v:any){
    var data1:any=document.getElementById('net_sales');
    var data2:any=document.getElementById('other_op_income');
    var data3:any=document.getElementById('other_income');
    var output:any=document.getElementById('rev_op');
    var addition=Number(data1.value)+Number(data2.value)+Number(data3.value);
    output.value=addition.toString();
    // console.log(" rev output",output.value);
    this.rev_op = Number(output.value);
    return addition;
    
  }
  // add2(v:any){
  //   var data1:any=document.getElementById('mat_cost');
  //   var data2:any=document.getElementById('mfg_costs');
  //   var output2:any=document.getElementById('gross_margin');
  //   var output3:any=document.getElementById('gm_percent');
  //   // var addition=Number(data1.value)+Number(data2.value);
  //   // output1.value=addition.toString();
  //   // this.cogs= parseInt(output1.value);
  //   let subValue = this.rev_op-this.cogs;
  //   output2.value = subValue.toString();
  //   let percent= (Number(output2.value)/this.rev_op)*100;
  //   output3.value=percent.toFixed(2).toString();
  // }
  add3(v:any){
    var data1:any=document.getElementById('st_sp');
    var data2:any=document.getElementById('power_fuel');
    var data3:any=document.getElementById('job_work');
    var data4:any=document.getElementById('repairs');
    var data5:any=document.getElementById('other_ex_con_lab');
    var data6:any=document.getElementById('mat_cost');
    var output1:any=document.getElementById('mfg_costs');
    var output2:any=document.getElementById('cogs');
    var output3:any=document.getElementById('gross_margin');
    var output4:any=document.getElementById('gm_percent');
    var mfg_cost_value=Number(data1.value)+Number(data2.value)+Number(data3.value)+Number(data4.value)+Number(data5.value);
    output1.value=mfg_cost_value.toString();
    var cogsValue=Number(output1.value)+Number(data6.value);
    output2.value=cogsValue.toString();
    this.cogs=Number(output2.value);
    let gross_margin_Value=this.rev_op-this.cogs;
    output3.value=gross_margin_Value.toString();
    let gm_percent_value=(Number(output3.value)/this.rev_op)*100;
    output4.value=gm_percent_value.toFixed(2).toString();

  }
  add4(v:any){
    var data1:any=document.getElementById('emp_benifit');
    var data2:any=document.getElementById('ad_sales');
    var data3:any=document.getElementById('comm');
    var data4:any=document.getElementById('freight_cor');
    var data5:any=document.getElementById('travelling');
    var data6:any=document.getElementById('legal_prof_charge');
    var data7:any=document.getElementById('rent');
    var data8:any=document.getElementById('maint');
    var data9:any=document.getElementById('other_opex');
    var data10:any=document.getElementById('corp_alloc');
    var output1:any=document.getElementById('total_opex');
    var output2:any=document.getElementById('ebitda');
    var output3:any=document.getElementById('ebitda2');
    var output4:any=document.getElementById('ebitda_percent');
    var total_opex_value=Number(data1.value)+Number(data2.value)+Number(data3.value)+Number(data4.value)+Number(data5.value)+Number(data6.value)
    +Number(data7.value)+Number(data8.value)+Number(data9.value)+Number(data10.value);
    output1.value=total_opex_value.toString();
    let gross_margin:any=document.getElementById('gross_margin');
    let subvalue2 = Number(gross_margin.value)-Number(output1.value);
    let percent2=(subvalue2/Number(this.rev_op)*100);
    output2.value=subvalue2.toString();
    output3.value=subvalue2.toString();
    output4.value=percent2.toFixed(2).toString();
    this.ebitda=Number(output2.value);
  }
  add5(v:any){
    var data1:any=document.getElementById('share_capital');
    var data2:any=document.getElementById('reserves');
    var output:any=document.getElementById('networth');
    var addition=Number(data1.value)+Number(data2.value);
    output.value=addition.toString();
  }
  sub1(v:any){
    var data1:any=document.getElementById('dep_amort');
    var output1:any=document.getElementById('ebit');
    var output2:any=document.getElementById('ebit_percent');
    let subvalue3=this.ebitda-Number(data1.value);
    output1.value=subvalue3.toString();
    this.ebit=Number(output1.value);
    let percent3=(Number(output1.value)/this.rev_op)*100;
    output2.value=percent3.toString();
  }
  pbt(v:any){
    var data1:any=document.getElementById('inter_cos_alloc');
    var data2:any=document.getElementById('exc_items');
    var output1:any=document.getElementById('pbt');
    var output2:any=document.getElementById('pbt_percent');
    var output3:any=document.getElementById('pbt_after');
    var output4:any=document.getElementById('pbt_percent_after');

    let pbt_value=this.ebit-Number(data1.value);
    output1.value=pbt_value.toString();
    let pbt_percent_value=(Number(output1.value)/this.rev_op)*100;
    output2.value=pbt_percent_value.toFixed(2).toString();
    let pbt_after_value=(Number(output1.value))- Number(data2.value);
    output3.value=pbt_after_value.toString();
    this.pbt_after=Number(output3.value);
    let pbt_percent_after_value=(Number(output3.value)/this.rev_op)*100;
    output4.value=pbt_percent_after_value.toFixed(2).toString();  
  }
  pat(v:any){
    var data1:any=document.getElementById('tax');
    var output1:any=document.getElementById('pat');
    var output2:any=document.getElementById('pat_percent');
    let pat_value=this.pbt_after-Number(data1.value);
    output1.value=pat_value.toString();
    let pat_percent_value=(Number(output1.value)/this.rev_op)*100;
    output2.value=pat_percent_value.toFixed(2).toString();
  }
  

  uploadcsv(){
    const formData=new FormData();
    formData.append('file',this.file);
    this.button=false;
    this.filepopup=true;
    if(this.file!=null){
      this.reportservice.postfile(formData).subscribe(
        (res) => {
          this.filepopup=false;
          this.button=true;
          console.log(res);
          window.alert("File Uploaded.");
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
      console.log(this.file);
      
    }else{
      this.button=true;
      this.filepopup=false;
      window.alert("Please upload a CSV file");
    }
  }


  submit(form: NgForm) {
    if(this.bu_name!=""){
       if(this.budget!=""){
        if(this.period!=""){
          this.reportservice.submitReport(form.value).subscribe(
            (res) => {
              console.log(res);
              this.isSubmit=true;
            },
            (err) => {
              console.log(err);
            }
          );
          console.log(form.value);
        }else{
          this.periodpopup=true;
          this.message="Please Select Period"
        }
       }else{
        this.budgetpopup=true;
        this.message="Please Select Budget or Actual"
       }
     
    }else{
      this.bupopup=true;
      this.message="Please Select BU NAME"
    }
    
  }

  back() {
    location.reload();
    this.isSubmit = false;
  }
}
