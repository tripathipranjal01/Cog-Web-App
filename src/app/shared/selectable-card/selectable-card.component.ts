import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selectable-card',
  templateUrl: 'selectable-card.component.html',
  styleUrls: ['selectable-card.component.scss'],
})
export class SelectableCardComponent implements OnInit {
  @Input({ required: true }) cardData: any[];
  @Output() selectionChange = new EventEmitter<string>();

  columnClass: string;
  selectedCard: any;
  backupCardData: any;
  filterText: string;

  ngOnInit(): void {
    this.selectedCard = this.cardData[0];
    this.backupCardData = this.cardData;
  }

  onCardClicked(updatedData: any) {
    // if (updatedData.option.id === this.selectedCard.id) {
    //   this.selectedCard = updatedData.option;
    // } else {
    //   this.selectedCard = updatedData.option;
    //   this.selectionChange.emit(this.selectedCard.id);
    // }

    if (updatedData.id === this.selectedCard.id) {
      this.selectedCard = updatedData;
    } else {
      this.selectedCard = updatedData;
      this.selectionChange.emit(this.selectedCard.id);
    }
  }

  filterCardItems() {
    const filterTextLower = this.filterText.toLowerCase();
    this.cardData = this.backupCardData.filter((e: { header: string }) =>
      e.header.toLowerCase().includes(filterTextLower)
    );
    console.log(this.cardData);
  }
}
