import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'anychart';
import { AdminService } from 'src/app/services/admin.service';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-paper-analytics',
  templateUrl: './paper-analytics.component.html',
  styleUrls: ['./paper-analytics.component.css']
})
export class PaperAnalyticsComponent implements OnInit {

  constructor(
    private paperService: PaperService
  ) { }

  @ViewChild('papersPieChart', {static: false}) chartContainer: ElementRef;
  pieChart: anychart.charts.Pie = null;
  private data = [];
  error: String = null;
  isLoading = false;
  waiting: number = 0;
  rejected: number = 0;
  approved: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this.isLoading = true;
    this.paperService.getPapersCount()
    .subscribe(
      response => {
        this.populateChart(response.data)
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.error = err;
        setInterval(() => {this.error = null}, 5000);
      }
    )
  }

  private populateChart(data: any){
    data.forEach(element => {
      if(element.statusCode === this.paperService.WAITING){
        this.data.push(['Under Review', element.count]);
        this.waiting = element.count;
        this.total += this.waiting;
      }
      else if (element.statusCode === this.paperService.APPROVED){
        this.data.push(['Approved', element.count]);
        this.approved = element.count;
        this.total += this.approved;
      }
      else if (element.statusCode === this.paperService.REJECTED){
        this.data.push(['Rejected', element.count]);
        this.rejected = element.count;
        this.total += this.rejected;
      }
    })

    this.chartContainer.nativeElement.innerHTML = "";

    this.pieChart = anychart.pie(this.data);
    this.pieChart.background().fill('#dbe2ef');
    this.pieChart.innerRadius('60%');
    this.pieChart.connectorStroke({color:  '#112d4e', thicknesss: 5});

    var noDataLabel = this.pieChart.noData().label();
    noDataLabel.enabled(true);
    noDataLabel.fontSize(20);
    noDataLabel.text('No records found');

    var labels = this.pieChart.labels();
    labels.position('outside');
    labels.fontColor('#112d4e');
    labels.fontSize(20);

    var legend = this.pieChart.legend();
    legend.enabled(true);
    legend.align('center');
    legend.iconSize(20);

    // under review, approved, rejected
    this.pieChart.palette(['#422040','#E57A44','#33673B']);
    this.pieChart.container(this.chartContainer.nativeElement);
    this.pieChart.draw();
  }

}
