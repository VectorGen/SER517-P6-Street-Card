# Generated by Django 3.0.3 on 2020-02-10 20:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StreetCardServices', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Homeless',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PersonalId', models.CharField(blank=True, max_length=32, null=True)),
                ('FirstName', models.CharField(blank=True, max_length=128, null=True)),
                ('MiddleName', models.CharField(blank=True, max_length=128, null=True)),
                ('LastName', models.CharField(blank=True, max_length=128, null=True)),
                ('NameSuffix', models.CharField(blank=True, max_length=128, null=True)),
                ('NameDataQuality', models.IntegerField(choices=[(1, 'Full Name Reported'), (2, 'Partial Name Reported'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
                ('SSN', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxLengthValidator(9), django.core.validators.MinLengthValidator(4)])),
                ('SSNDataQuality', models.IntegerField(choices=[(1, 'Full SSN Reported'), (2, 'Partial Name Reported'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
                ('DOB', models.DateField(blank=True, null=True)),
                ('DOBDataQuality', models.IntegerField(choices=[(1, 'Full DOB Reported'), (2, 'Partial DOB Reported'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
                ('Race', models.IntegerField(choices=[(1, 'American India or Alaskan Native'), (2, 'Asian'), (3, 'Balck or African American'), (4, 'Native Hawaiian or Pacific Islander'), (5, 'White'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
                ('Ethnicity', models.IntegerField(choices=[(0, 'Non Hispanic/Non Latino'), (1, 'Hispanic/Latino'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
                ('Gender', models.IntegerField(choices=[(0, 'Female'), (1, 'Male'), (3, 'Trans Female'), (4, 'Trans Male'), (5, 'Gender Non-Conforming'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
                ('VeteranStatus', models.IntegerField(choices=[(0, 'No'), (1, 'Yes'), (8, "Client Doesn't Know"), (9, 'Client Refused'), (99, 'Data Not Collected')])),
            ],
        ),
        migrations.DeleteModel(
            name='SocialWorker',
        ),
    ]