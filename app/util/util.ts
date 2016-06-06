import {Injectable} from '@angular/core';


declare var AtD: any;
@Injectable()
export class Util {
    private currentUser: any = {};
    private currentTest: any = {};
    private result: any = {};
    wordCountSuggestion(count) {
        if (count < 50)
            return 'Bad! You email should contain at least 50 words.';
        if (count <= 70)
            return 'Good! You can add a few more words.';
        if (count <= 80)
            return 'Excellent! Your email is of precise length.';
        return 'Bad! Your email is lengthy. Avoid making it too long.';
    };

    salutationError(content) {
        return content.indexOf('Dear') < 0;
    };
    leaveTakingError(content) {
        return content.indexOf('Thanks') < 0 && content.indexOf('Thanks and Regards') && content.indexOf('Thanks and regards') < 0 && content.indexOf('Regards') < 0;
    };
    unmatchedPhrases(phrases, content) {
        phrases = phrases.trim().toUpperCase().split('-');
        content = content.toUpperCase();
        var unmatchedPhrases = [];
        for (var i = 0; i < phrases.length; i++) {
            if (content.indexOf(phrases[i].trim()) < 0) {
                unmatchedPhrases.push(phrases[i].toLowerCase());
            }
        }
        return unmatchedPhrases;
    };

    scoreSuggestion(score) {
        if (score < 50)
            return 'Bad! Improve your score.';
        if (score < 80)
            return 'Good! Missed something? Here are a few tips to remember : <a href="http://goo.gl/AouxeV" target="_blank">http://goo.gl/AouxeV</a>';
        if (score < 90)
            return 'Very Good! Your chance of getting selected is high. Improve your score.';
        return 'Excellent! You will qualify Verbal Ability Test. Avoid any spelling or grammatical error.';
    };

    checkSpellingAndGrammar() {
        return new Promise(resolve => {
            AtD.checkCrossAJAX('tcs-verbal-exam-answer',
                {
                    success: function (errorCount) {
                        if (errorCount == 0) {
                            //alert("No writing errors were found");
                        }
                    },

                    error: function (reason) {
                        resolve({ reason: reason });
                    },
                    ready: function (msg) {
                        //$log.info(msg);
                        resolve({ errorCount: msg })
                    }
                });
        });
    };
    capitalizationError(content) {
        if (content)
            return 0;
        var count = 0;
        count += (content.length - content.replace(' i ', '  ').length);
        content = content.replace('Mr.', '');
        content = content.replace('Ms.', '');
        var sentences = content.trim().split('.');
        for (var i = 0; i < sentences.length; i++) {
            sentences[i] = sentences[i].trim();
            if ((sentences[i].charAt(0) + '') == (sentences[i].charAt(0) + '').toUpperCase())
                continue;
            else
                count++;
        }
        return count;
    };
    evaluate (words, outline, content) {
        let result: any = {};
        result.count = words;
        result.unmatchedPhrases = this.unmatchedPhrases(outline, content);
        result.salutationError = this.salutationError(content);
        result.leaveTakingError = this.leaveTakingError(content);
        result.capError = this.capitalizationError(content);
        result.spellcheck = this.checkSpellingAndGrammar;
        var mistakes = [];
        var score = 50;
        result.mistakes = mistakes;

        if (words < 50) {
            result.score = 0;
            mistakes.push(
                {
                    title: "Too Short",
                    subtitle: "Minimum word required is 50.",
                    description: "<strong style='font-size:20px;color:red;'>Your Email must contain at least 50 words</strong>. Your email would not be evaluated."
                });
            return result;
        }

        if (result.salutationError) {
            score -= 10;
            mistakes.push(
                {
                    title: "Salutation Error",
                    subtitle: "You have not provided a proper salutation.",
                    description: " Include a proper salutation e.g. \'Dear\' "
                });
        }
        if (result.capError > 0) {
            score -= 10;
            mistakes.push({
                title: "Capitalization Error",
                subtitle: "Capitalization of word required at the begining of a sentence.",
                description: "Number of capitalization errors : " + result.capError
            });
        }
        if (result.unmatchedPhrases.length) {
            score -= 20;
            mistakes.push({
                title: "Outline not matched",
                subtitle: "All phrase given in the outline must match.",
                description: "Ensure all your phrases are matched. The following phrases did not match : <br>" + result.unmatchedPhrases.join("-")
            });
        }
        if (result.leaveTakingError) {
            score -= 10;
            mistakes.push({
                title: "Leave-taking Error",
                subtitle: "You have not used a correct form of leave taking.",
                description: "Recommended :<br/> " + [
                    '<ul>',
                    '<li>Regards</li>',
                    '<li>Thanks</li>',
                    '<li>Thanks and regards</li>'
                ].join('')
            }
            );
        }
        if (words < 70) {
            score += 30;
        } else if (words <= 90) {
            score += 40
        } else {
            score += 35;
        }
        result.mistakes = mistakes;
        result.countRemark = this.wordCountSuggestion(words);
        result.score = score;
        result.scoreRemark = this.scoreSuggestion(score);
        return result;
    };

}