import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  
  @ViewChild('usersPieChart', {static: false}) chartContainer: ElementRef;
  pieChart: anychart.charts.Pie = null;
  private data = [];
  userError: String = null;
  collegeError: String = null;
  admins: number = 0;
  spocs: number = 0;
  students: number = 0;
  total: number = 0;
  colleges: number = 0;

  ngOnInit(): void {
    this.adminService.getUsersCount()
    .subscribe(
      response => {
        this.populateChart(response.data)
      },
      err => {
        this.userError = err;
        setInterval(() => {this.userError = null}, 5000);
      }
    )
    this.adminService.getCollegesCount()
    .subscribe(
      response => { this.colleges = response.data[0].count },
      err => {
        this.collegeError = err;
        setInterval(() => {this.collegeError = null}, 5000);
      }
    );
  }

  private populateChart(data: any){
    data.forEach(element => {
      if(element.role === 'student'){
        this.data.push(['Students', element.count]);
        this.students = element.count;
        this.total += this.students;
      }
      else if (element.role === 'spoc'){
        this.data.push(['SPOCs', element.count]);
        this.spocs = element.count;
        this.total += this.spocs;
      }
      else if (element.role === 'admin'){
        this.data.push(['Admins', element.count]);
        this.admins = element.count;
        this.total += this.admins;
      }
    })

    this.chartContainer.nativeElement.innerHTML = "";

    this.pieChart = anychart.pie(this.data);
    this.pieChart.background().fill('#dbe2ef');
    this.pieChart.innerRadius('60%')
    this.pieChart.connectorStroke({color:  '#112d4e', thicknesss: 5})

    var noDataLabel = this.pieChart.noData().label();
    noDataLabel.enabled(true);
    noDataLabel.fontSize(20);
    noDataLabel.text('No records found');

    var labels = this.pieChart.labels();
    labels.position('outside')
    labels.fontColor('#112d4e');
    labels.fontSize(20);

    var legend = this.pieChart.legend();
    legend.enabled(true);
    // legend.position('right');
    legend.align('center');
    legend.iconSize(20);

    // student, approved, rejected
    this.pieChart.palette(['#422040','#E57A44','#33673B'])
    this.pieChart.container(this.chartContainer.nativeElement);
    this.pieChart.draw();
  }

}
