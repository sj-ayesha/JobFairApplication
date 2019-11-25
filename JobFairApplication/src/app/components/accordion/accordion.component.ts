import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"]
})
export class AccordionComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

  changeLabel(ele) {
    ele.nextElementSibling.nodeValue = ele.checked ? 'Applied' : 'Apply';
  }
}
