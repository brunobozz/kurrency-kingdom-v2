import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-paginator.component.html',
  styleUrl: './list-paginator.component.scss',
})
export class ListPaginatorComponent {
  @Input() pages: number = 1;
  @Input() active: number = 1;
  @Output() onPageChange = new EventEmitter<number>();

  pageNeighbours: number = 2;

  // Função para gerar um range de números
  private range(from: number, to: number, step: number = 1): number[] {
    let i = from;
    const range: number[] = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  }

  // Função para buscar os números de página
  fetchPageNumbers(): (number | string)[] {
    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (this.pages > totalBlocks) {
      const startPage = Math.max(2, this.active - this.pageNeighbours);
      const endPage = Math.min(
        this.pages - 1,
        this.active + this.pageNeighbours
      );

      let pagesArray: (number | string)[] = this.range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = this.pages - endPage > 1;
      const spillOffset = totalNumbers - (pagesArray.length + 1);

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = this.range(startPage - spillOffset, startPage - 1);
        pagesArray = ['...', ...extraPages, ...pagesArray];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = this.range(endPage + 1, endPage + spillOffset);
        pagesArray = [...pagesArray, ...extraPages, '...'];
      } else if (hasLeftSpill && hasRightSpill) {
        pagesArray = ['...', ...pagesArray, '...'];
      }

      return [1, ...pagesArray, this.pages];
    }

    return this.range(1, this.pages);
  }

  // Função para mudar a página
  onPageClick(page: number | string) {
    if (typeof page === 'number' && page !== this.active) {
      this.onPageChange.emit(page);
    }
  }

  // Função para ir para a página anterior
  goToPreviousPage() {
    if (this.active > 1) {
      this.onPageChange.emit(this.active - 1);
    }
  }

  // Função para ir para a próxima página
  goToNextPage() {
    if (this.active < this.pages) {
      this.onPageChange.emit(this.active + 1);
    }
  }
}
