from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms

class RegisterForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'password1', 'password2')
    def clean_email(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        if email and get_user_model().objects.filter(email=email).count() > 0:
            raise forms.ValidationError(u'Cette adresse email existe déjà.')
        return email


class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Email / Nom d'utilisateur")

#import unicodedata
#from django import forms
#from django.contrib.auth.forms import UserCreationForm
#from django.contrib.auth.models import User
#from django.core.exceptions import ValidationError
#from django.utils.text import capfirst
#from django.utils.translation import gettext, gettext_lazy as _
#from django.contrib.auth import (
#    authenticate, get_user_model, password_validation,
#)
#
#UserModel = get_user_model()
#
#class UsernameField(forms.CharField):
#    def to_python(self, value):
#        return unicodedata.normalize('NFKC', super().to_python(value))
#
#    def widget_attrs(self, widget):
#        return {
#            **super().widget_attrs(widget),
#            'autocapitalize': 'none',
#            'autocomplete': 'username',
#            'placeholder': 'Pseudonyme',
#            'class': 'focus:outline-none focus:placeholder-teal-500'
#        }
#
#
#class RegisterForm(forms.ModelForm):
#    email = forms.EmailField(max_length=254, help_text='Requis. Saisir une adresse email valide.',
#                             widget=forms.TextInput(attrs={'type': 'email', 'autocomplete': 'email', 'placeholder': 'Adresse email',
#                                                           'class': 'bg-gray-800 focus:outline-none focus:placeholder-teal-500'}))
#    error_messages = {
#        'password_mismatch': _('The two password fields didn’t match.'),
#    }
#    password1 = forms.CharField(
#        label=_("Password"),
#        strip=False,
#        widget=forms.PasswordInput(
#            attrs={'autocomplete': 'new-password', 'class': 'bg-gray-800 focus:outline-none'}),
#        help_text=password_validation.password_validators_help_text_html(),
#    )
#    password2 = forms.CharField(
#        label=_("Password confirmation"),
#        widget=forms.PasswordInput(
#            attrs={'autocomplete': 'new-password', 'class': 'bg-gray-800 focus:outline-none'}),
#        strip=False,
#        help_text=_("Enter the same password as before, for verification."),
#    )
#
#    class Meta:
#        model = User
#        fields = ("username", "email")
#        field_classes = {'username': UsernameField}
#
#    def __init__(self, *args, **kwargs):
#        super().__init__(*args, **kwargs)
#        if self._meta.model.USERNAME_FIELD in self.fields:
#            self.fields[self._meta.model.USERNAME_FIELD].widget.attrs['autofocus'] = True
#    
#    def clean_email(self):
#        email = self.cleaned_data.get('email')
#
#        try:
#            match = User.objects.get(email=email)
#        except User.DoesNotExist:
#            return email
#
#        raise forms.ValidationError('Cette d e-mail existe déjà.')
#
#
#    def clean_password2(self):
#        password1 = self.cleaned_data.get("password1")
#        password2 = self.cleaned_data.get("password2")
#        if password1 and password2 and password1 != password2:
#            raise ValidationError(
#                self.error_messages['password_mismatch'],
#                code='password_mismatch',
#            )
#        return password2
#
#    def _post_clean(self):
#        super()._post_clean()
#        # Validate the password after self.instance is updated with form data
#        # by super().
#        password = self.cleaned_data.get('password2')
#        if password:
#            try:
#                password_validation.validate_password(password, self.instance)
#            except ValidationError as error:
#                self.add_error('password2', error)
#
#    def save(self, commit=True):
#        user = super().save(commit=False)
#        user.set_password(self.cleaned_data["password1"])
#        if commit:
#            user.save()
#        return user
#
#class EmailField(forms.EmailField):
#    def to_python(self, value):
#        return unicodedata.normalize('NFKC', super().to_python(value))
#
#    def widget_attrs(self, widget):
#        return {
#            **super().widget_attrs(widget),
#            'autocapitalize': 'none',
#            'autocomplete': 'username',
#            'placeholder': 'Email',
#            'class': 'focus:outline-none focus:placeholder-teal-500'
#        }