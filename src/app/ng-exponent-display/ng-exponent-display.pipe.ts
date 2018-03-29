import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'ngExponentDisplay'
})
export class NgExponentDisplayPipe implements PipeTransform {
  lettersRegex = new RegExp('[a-z\*\+]');
  exponentRegex = new RegExp('[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)');

  transform(input: any, nativeElement: any, useThousandsSeparator = false): any {
    let retValue = input;
    let elementWidth;
    let maxNumberOfLetters;

    if (nativeElement) {
      elementWidth = nativeElement.width;
      maxNumberOfLetters = elementWidth / 10; // 10px === width of 'w' and '8'

      if (this.lettersRegex.test(input) && !this.exponentRegex.test(input)) {
        // it's non numerical
        if (('' + input).length > maxNumberOfLetters) {
          // elementRef.css('font-size', (maxNumberOfLetters / ('' + input).length) + 'em');
          nativeElement.style['font-size'] = (maxNumberOfLetters / ('' + input).length) + 'em';
          // elementRef.attr('title', input);
          nativeElement.setAttribute('title', input);

        } else {
          // elementRef.css('font-size', '1em');
          nativeElement.style['font-size'] = '1em';
          // elementRef.attr('title', '');
          nativeElement.setAttribute('title', '');
        }
      } else {
          // it can come in as an exponent from JS
          // then, chop of precision
          if (this.exponentRegex.test(input)) {
              if (!input.toPrecision) {
                  input = parseFloat(input);
              }
              retValue = input.toPrecision(3);
              if (('' + retValue).length > maxNumberOfLetters) {
                  // elementRef.css('font-size', (maxNumberOfLetters/('' + retValue).length) + 'em');
                  nativeElement.style['font-size'] = (maxNumberOfLetters / ('' + retValue).length) + 'em';
                  // elementRef.attr('title', input);
                  nativeElement.setAttribute('title', input);
              } else {
                  // elementRef.css('font-size', '1em');
                  nativeElement.style['font-size'] = '1em';
                  // elementRef.attr('title', '');
                  nativeElement.setAttribute('title', '');
              }
          } else {
              if (('' + input.toLocaleString('en-US')).length > maxNumberOfLetters) {
                  retValue = parseFloat(input).toExponential(2);
              } else {
                if (useThousandsSeparator) {
                  retValue = parseFloat(retValue).toLocaleString('en-US');
                }
              }
              // elementRef.css('font-size', '1em');
              nativeElement.style['font-size'] = '1em';
              // elementRef.attr('title', '');
              nativeElement.setAttribute('title', '');
          }
      }
    }

    return (retValue ? retValue : 'N/A');
  }

}
