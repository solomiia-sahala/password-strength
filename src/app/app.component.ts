import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

enum ValidationClass {
  EMPTY = 'empty',
  SHORT = 'short',
  EASY = 'easy',
  MEDIUM = 'medium',
  STRONG = 'strong'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  passwordForm: FormControl;
  validationClass: ValidationClass;

  readonly blockClasses = ['easy', 'medium', 'strong'];

  ngOnInit(): void {
    this.passwordForm = new FormControl('');

    this.passwordForm?.valueChanges.subscribe((value) => {
      this.validatePassword(value);
    });
  }

  validatePassword(value: string): void {
    if (!value) {
      this.validationClass = ValidationClass.EMPTY;
    } else if (value.length < 8) {
      this.validationClass = ValidationClass.SHORT;
    } else if (this.containsOnlyDigits(value) || this.containsOnlyLetters(value) || this.containsOnlySymbols(value)) {
      this.validationClass = ValidationClass.EASY;
    } else if (this.containsLettersSymbolsAndNumbers(value)) {
      this.validationClass = ValidationClass.STRONG;
    } else {
      // Combination of letters-symbols/letters-digits/digits-symbols
      this.validationClass = ValidationClass.MEDIUM;
    }
  }

  private containsOnlyDigits(value): boolean {
    // Regular expression to match only digits
    const regex = /^\d+$/;
    return regex.test(value);
  }

  private containsOnlyLetters(value): boolean {
    // Regular expression to match only letters (case-insensitive)
    const regex = /^[a-zA-Z]+$/;
    return regex.test(value);
  }

  private containsOnlySymbols(value): boolean {
    // Regular expression to match only symbols (non-alphanumeric characters)
    const regex = /^[^\w\s]+$/;
    return regex.test(value);
  }

  private containsLettersSymbolsAndNumbers(value): boolean {
    // Regular expression to match at least one letter, one symbol, and one number
    const regex = /(?=.*[a-zA-Z])(?=.*[^\w\s])(?=.*\d)/;
    return regex.test(value);
  }
}

