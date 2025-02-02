import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'my-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-pagination.component.html',
  styleUrl: './my-pagination.component.scss',
})
export class MyPaginationComponent implements OnInit {
  //injection of Services
  translate = inject(TranslateService);
  
  @Input() totalPages: number = 0;
  @Input() pageIndex: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(): void {
    this.updatePagination();
  }

  updatePagination() {
    const windowSize = 4;

    const startPage = Math.max(1, this.pageIndex - 1);
    const endPage = Math.min(this.totalPages, startPage + windowSize - 1);

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  // Navigate to a specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageIndex = page;
      this.pageChange.emit(this.pageIndex);
      this.updatePagination();
    }
  }

  // Navigate to the first page
  goToFirstPage() {
    if (this.pageIndex !== 1) {
      this.pageIndex = 1;
      this.pageChange.emit(this.pageIndex);
      this.updatePagination();
    }
  }

  // Navigate to the last page
  goToLastPage() {
    if (this.pageIndex !== this.totalPages) {
      this.pageIndex = this.totalPages;
      this.pageChange.emit(this.pageIndex);
      this.updatePagination();
    }
  }
}
