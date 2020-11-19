import { Component, Input } from "@angular/core";

@Component({
  selector: "doubleChevronLeft",
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 407.436 407.436"
      style="enable-background:new 0 0 407.436 407.436;"
      xml:space="preserve"
      width="16px"
      height="16px"
    >
      <g>
        <polygon
          points="266.452,21.178 245.204,0 42.149,203.718 245.204,407.436 266.452,386.258 84.507,203.718  "
        />
        <polygon
          points="365.286,21.178 344.038,0 140.983,203.718 344.038,407.436 365.286,386.258 183.341,203.718  "
        />
      </g>
    </svg>
  `,
})
export class DoubleChevronLeft {
  @Input() class: string;
}
